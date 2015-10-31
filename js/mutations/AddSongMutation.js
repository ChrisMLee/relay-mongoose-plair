import Relay from 'react-relay';
import React from 'react';

export default class AddSongMutation extends Relay.Mutation {
	static fragments = {
		playlist: () => Relay.QL`
		  fragment on Playlist {
		    id
		  }
		`
	};

	getMutation () {
    	return Relay.QL`mutation { addSong }`;
  	}

  	getVariables () {
	    return {
	      id: this.props.id,
	      youtubeLink: this.props.youtubeLink
	    }
	}

	getFatQuery () {
	return Relay.QL`
	  fragment on AddSongPayload {
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
		    playlist: this.props.id
		  }
		}];
	}

	getOptimisticResponse() {
	    return {
	      playlist: {
	        id: this.props.id
	      },
	    }
    }

}
