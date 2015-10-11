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
      type: new GraphQLList(HobbyType),
      description: 'The ships used by the faction.'
    },
    friends: {
      type: new GraphQLList(UserType)
    },
    playlists: {
      type: new GraphQLList(PlaylistType)
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

let SongType = new GraphQLObjectType({
  name: 'Song',
  description: 'A song',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    artist: {
      type: GraphQLString
    },
    type: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }),

  interfaces: [nodeInterface]
});

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
    resolve: Playlist.getPlaylistById
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
    updateUser: UserUpdateMutation
  })
});


let schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

export default schema;