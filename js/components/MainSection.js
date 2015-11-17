import Relay from 'react-relay';
import React from 'react';

class MainSection extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
		<div>
			<p>{this.props.currentState.currentPlaylist.id}</p>
		</div>
		);
	}
}


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