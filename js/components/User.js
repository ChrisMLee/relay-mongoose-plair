import Relay from 'react-relay';
import React from 'react';
import HobbyList from './HobbyList.js';
import FriendsList from './FriendsList.js';
import Playlists from './Playlists';
import {Age} from './Age.js';

class User extends React.Component {
  render() {
    var user = this.props.user;
    const { actions } = this.props;
    
    return (
      <div>
        <h1>Hello {user.name} {user.surname}</h1>
        <h2>Hobbies</h2>
        <HobbyList user={user} />
        <h2>Friends</h2>
        <FriendsList user={user} />
        <Playlists user={user} actions={actions}/>
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
        ${Playlists.getFragment('user')}
      }
    `
  }
});