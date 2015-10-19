import React from 'react';
import Playlists from './Playlists';
import {Age} from './Age.js';

class UserTwo extends React.Component {
  render() {
    var user = this.props.user;
    const { actions } = this.props;
    
    return (
      <div>
        <Playlists user={user} actions={actions}/>
        <Age user={user} />
      </div>
    );
  }
}

export default Relay.createContainer(UserTwo, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        name
        surname
        ${Age.getFragment('user')}
        ${Playlists.getFragment('user')}
      }
    `
  }
});