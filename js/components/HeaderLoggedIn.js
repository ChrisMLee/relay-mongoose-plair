import React from 'react';
import Relay from 'react-relay';

class HeaderLoggedIn extends React.Component {
  componentDidMount(){
  	//console.log('the beginning', this.props.actions.setSong('thing'));
  }
  render() {
  	const { currentState, actions } = this.props;
    let user = this.props.user;
    return (
      <div>
          <h1>Plair</h1>
          <button onClick={() => {actions.logout();} }>Logout</button>
      		<h3>Hello {user.name} {user.surname}, {user.id}</h3>
      		<h3>Current Song: {currentState.currentSong.title}</h3>
      </div>
    );
  }
}


export default Relay.createContainer(HeaderLoggedIn, {
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