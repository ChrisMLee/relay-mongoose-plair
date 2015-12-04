import Relay from 'react-relay';
import React from 'react';

class CurrentPlaylist extends React.Component {
	constructor(props){
		super(props);
		console.log('MainSection was called with props', props);
	}
	render(){
		console.log('rendering with props', this.props);
		return (
		<div>
			<p>{this.props.currentState.currentPlaylist.id}</p>
		</div>
		);
	}
}

// Where, all

export default Relay.createContainer(MainSection, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        name
        surname
      }
    `
  }
});