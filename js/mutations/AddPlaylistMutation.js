import Relay from 'react-relay';
import React from 'react';

export default class AddPlaylistMutation extends Relay.Mutation {
	// static fragments = {
	// 	user: () => Relay.QL`
	// 	  fragment on User {
	// 	    id
	// 	  }
	// 	`
	// };

	getMutation () {
    	return Relay.QL`mutation { addPlaylist }`;
  	}

  	getVariables () {
	    return {
	      id: this.props.id,
	      title: this.props.title
	    }
	}

	getFatQuery () {
	return Relay.QL`
	  fragment on CreatePlaylistPayload {
	    playlistEdge,
        user {
          playlists
        }
	  }
	`
	}

	getConfigs () {
		return [{
	      type: 'FIELDS_CHANGE',
	      fieldIDs: {
	        user: this.props.id,
	      },
	    },
	    {
	      type: 'RANGE_ADD',
	      parentName: 'user',
	      parentID: this.props.id,
	      connectionName: 'playlists',
	      edgeName: 'playlistEdge',
	      rangeBehaviors: {
	        '': 'append',
	      },
	    }];	
	}

	// getOptimisticResponse() {
	//     return {
	//       playlist: {
	//         id: this.props.id
	//       },
	//     }
 //    }

}