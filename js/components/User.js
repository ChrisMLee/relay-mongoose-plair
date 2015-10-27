import Relay from 'react-relay';
import React from 'react';
import HobbyList from './HobbyList.js';
import FriendsList from './FriendsList.js';
import Playlists from './Playlists';
import {Age} from './Age.js';

// <h2>Hobbies</h2>
// <HobbyList user={user} />
// <h2>Friends</h2>
// <FriendsList user={user} />

class User extends React.Component {
  constructor(props){
    super(props);
    console.log('at least User exists');
  }
  render() {
    var user = this.props.user;
    const { actions } = this.props;
    
    return (
      <div>
        
        <Age user={user} />
      </div>
    );
  }
}

export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        name
        surname
        ${Age.getFragment('user')}
        ${HobbyList.getFragment('user')}
        ${FriendsList.getFragment('user')}
      }
    `
  }
});