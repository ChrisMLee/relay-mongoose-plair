import Relay from 'react-relay';
import React from 'react';

export default class AddSongMutation extends Relay.Mutation {
	// static fragments = {
	// 	playlist: () => Relay.QL`
	// 	  fragment on Playlist {
	// 	    id
	// 	  }
	// 	`
	// };

	getMutation () {
    	return Relay.QL`mutation { addPlaylist }`;
  	}

  	getVariables () {
	    return {
	      creatorId: this.props.creatorId,
	      title: this.props.title
	    }
	}

	getFatQuery () {
	return Relay.QL`
	  fragment on CreatePlaylistPayload {
	    playlist {
	    	title
	    }
	  }
	`
	}

	// getConfigs () {
	// 	return [{
	// 	  type: 'FIELDS_CHANGE',
	// 	  fieldIDs: {
	// 	    playlist: this.props.id
	// 	  }
	// 	}];
	// }

	// getOptimisticResponse() {
	//     return {
	//       playlist: {
	//         id: this.props.id
	//       },
	//     }
 //    }

}