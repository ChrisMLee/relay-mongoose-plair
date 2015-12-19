import User from './Models/UserSchema.es6';
import Hobby from './Models/HobbySchema.es6';
import Playlist from './Models/PlaylistSchema.js';

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType
  } from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return User.getUserById({id: id});
    } else if (type === 'Hobby') {
      return Hobby.getHobbyById({id: id});
    } else if (type === 'Playlist') {
      return Playlist.getPlaylistById({id: id});
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj.type == "user") {
      return UserType;
    } else if (obj.type == "hobby")  {
      return HobbyType;
    } else if (obj.type == "playlist")  {
      return PlaylistType;
    }else {
      return null;
    }
  }
);

let HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'A hobby',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    type: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }),

  interfaces: [nodeInterface]
});

let PlaylistType = new GraphQLObjectType({
  name: 'Playlist',
  description: 'A playlist',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    _creatorId: {
      type: GraphQLString
    },
    songs: {
      type: new GraphQLList(SongType)
    },
    type: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }),

  interfaces: [nodeInterface]
});

// Create a playlist connection type

var {
  connectionType: PlaylistConnection,
  edgeType: PlaylistTypeEdge,
} = connectionDefinitions({
  name: 'Playlist',
  nodeType: PlaylistType,
});

let UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    surname: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    hobbies: {
      type: new GraphQLList(HobbyType)
    },
    friends: {
      type: new GraphQLList(UserType)
    },
    playlist:{
      type: PlaylistType,
      args:{
        id: {
          type: GraphQLID
        }
      },
      resolve: (root, {id}) => {
        return Playlist.getPlaylistById(id);
      }
    },
    playlists: {
      type: PlaylistConnection,
      args: connectionArgs,
      resolve: (obj, args) => {
        return Playlist.getPlaylistsForUser(obj.id).then((res)=>{
         return connectionFromArray(res, args);
        });
      }
    },
    type: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }),

  interfaces: [nodeInterface]
});

let SongType = new GraphQLObjectType({
  name: 'Song',
  description: 'A song',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    youtubeLink: {
      type: GraphQLString
    },
    type: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }),

  interfaces: [nodeInterface]
});

// This is the first candidate for pagination
let UserQueries = {
  users: {
    type: new GraphQLList(UserType),
    name: 'users',
    description: 'A user list',
    resolve: User.getListOfUsers
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: (root, {id}) => {
      return User.getUserById(id)
    }
  }
};

let HobbyQueries = {
  hobby: {
    type: HobbyType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: Hobby.getHobbyById
  },

  hobbies: {
    type: new GraphQLList(HobbyType),
    resolve: Hobby.getListOfHobbies
  }
};

let PlaylistQueries = {
  playlist: {
    type: PlaylistType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: (root, {id}) => {
      return Playlist.getPlaylistById(id);
    }
  }
};

let UserUpdateMutation = mutationWithClientMutationId({
  name: 'UpdateUser',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID) },
    age: { type: GraphQLInt },
    name: {type: GraphQLString },
    surname: {type: GraphQLString }
  },

  outputFields: {
    user: {
      type: UserType,
      resolve: ({id}) => {
        return User.getUserById(id)
      }
    }
  },

  mutateAndGetPayload: User.updateUser
});

let UserUpdateAgeMutation = mutationWithClientMutationId({
  name: 'UpdateAge',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID) },
    age: { type: new GraphQLNonNull(GraphQLInt) }
  },

  outputFields: {
    user: {
      type: UserType,
      resolve: ({id}) => {
        return User.getUserById(id)
      }
    }
  },

  mutateAndGetPayload: User.updateAge
});

let CreatePlaylistMutation = mutationWithClientMutationId({
  name: 'CreatePlaylist',
  inputFields:{
    id: {type: new GraphQLNonNull(GraphQLID) },
    title: {type: GraphQLString }
  },
  outputFields: {
    playlistEdge: {
      type: PlaylistTypeEdge,
      resolve: ({creatorId, playlistId }) => {
        let playlist;

        return Playlist.getPlaylistById(playlistId).then((newPlaylist)=>{
          playlist = newPlaylist;
          return Playlist.getPlaylistsForUser(creatorId);
        }).then((foundPlaylists)=>{
          return{
            cursor: cursorForObjectInConnection(foundPlaylists, playlist),
            node: playlist
          };
        });
      }
    },
    playlist: {
      type: PlaylistType,
      resolve: ({playlistId}) => {
        return Playlist.getPlaylistById(playlistId);
      }
    },
    user: {
      type: UserType,
      resolve: ({creatorId}) => {
        User.getUserById({creatorId})
      }
    }
  },
  mutateAndGetPayload: ({id, title}) => {
    return Playlist.createPlaylist({id, title}).then((result)=>{
      let {creatorId, playlistId } = result;
      return {creatorId, playlistId };
    });
  }
});

let DeletePlaylistMutation = mutationWithClientMutationId({
  name: 'DeletePlaylist',
  inputFields:{
    playlistId: {type: new GraphQLNonNull(GraphQLID) }
  },
  outputFields: {
    deletedPlaylistId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (playlistId) => {
        console.log('TRIED TO RESOLVE');
        return playlistId;
      }
    }
  },
  mutateAndGetPayload: ({playlistId}) => {
    return Playlist.deletePlaylist(playlistId);
  }
});

/* Good to know: args need to have this structure {arg} because the input object comes in as
  deletePlaylist called, id: { playlistId: '56490827a544e25156f4ca63',
  clientMutationId: '124' }
*/

let DeleteSongFromPlaylistMutation = mutationWithClientMutationId({
  name: 'DeleteSong',
  inputFields:{
    songId: {type: new GraphQLNonNull(GraphQLID) },
    playlistId: {type: new GraphQLNonNull(GraphQLID) }
  },
  outputFields: {
    playlist: {
      type: PlaylistType,
      resolve: (playlist) => {
        return Playlist.getPlaylistById(playlist.id);
      }
    }
  },
  mutateAndGetPayload: ({songId, playlistId}) => {
    return Playlist.deleteSong({songId, playlistId});
  }
});

let AddSongToPlaylistMutation = mutationWithClientMutationId({
  name: 'AddSong',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID) },
    youtubeLink: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    playlist: {
      type: PlaylistType,
      resolve: (playlist) => {
        console.log('AT LEAST RESOLVE GETTING CALLED', Playlist.getPlaylistById(playlist.id));
        return Playlist.getPlaylistById(playlist.id);
      }
    }
  },

  mutateAndGetPayload: ({id, youtubeLink}) => {
    // closure?
    // function giveFinalResult(result){
    //   return result;
    // }
    // console.log('What is this', Playlist.addSong({id, youtubeLink}));
    return Playlist.addSong({id, youtubeLink});
  }
});

let RootQuery = new GraphQLObjectType({
  name: 'RootQuery',      //Return this type of object

  fields: () => ({
    user: UserQueries.user,
    users: UserQueries.users,
    hobby: HobbyQueries.hobby,
    hobbies: HobbyQueries.hobbies,
    playlist: PlaylistQueries.playlist,
    node: nodeField
  })
});


let RootMutation = new GraphQLObjectType({
  name: "RootMutation",

  fields: () => ({
    updateAge: UserUpdateAgeMutation,
    updateUser: UserUpdateMutation,
    addSong: AddSongToPlaylistMutation,
    deleteSong: DeleteSongFromPlaylistMutation,
    addPlaylist: CreatePlaylistMutation,
    deletePlaylist: DeletePlaylistMutation
  })
});


let schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

export default schema;