import Relay from 'react-relay';
import React from 'react';

export default class DeleteSongMutation extends Relay.Mutation {
	// static fragments = {
	// 	playlist: () => Relay.QL`
	// 	  fragment on Playlist {
	// 	    id
	// 	  }
	// 	`
	// };

	getMutation () {
    	return Relay.QL`mutation { deleteSong }`;
  	}

  	getVariables () {
	    return {
	      songId: this.props.songId,
	      playlistId: this.props.playlistId
	    }
	}

	getFatQuery () {
	return Relay.QL`
	  fragment on DeleteSongPayload {
	    playlist {
	      songs
	    }
	  }
	`
	}

	getConfigs () {
		return [{
		  type: 'FIELDS_CHANGE',
		  fieldIDs: {
		    playlist: this.props.playlistId
		  }
		}];
	}

	getOptimisticResponse() {
	    return {
	      playlist: {
	        id: this.props.playlistId
	      },
	    }
    }

}