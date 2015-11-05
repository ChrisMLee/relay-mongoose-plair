import React from 'react';
import Relay from 'react-relay';
import Playlists from './Playlists';
import {Age} from './Age.js';


// https://github.com/transedward/relay-chat/blob/b6ff3c161b855fe900daca1de74e059de1e1e1e7/js/components/ChatApp.js

class UserTwo extends React.Component {
  constructor(props){
    super(props);
    console.log('at least UserTwo exists');
  }
  render() {
    //var user = this.props.user;
    const { actions } = this.props;
    const {user, user: {playlists}} = this.props;

    //<Age user={user} />
    return (
      <div>
        <Playlists user={user} playlists={playlists} actions={actions}/>
      </div>
    );
  }
}

export default Relay.createContainer(UserTwo, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        playlists(first: 100) {
          edges {
            node {
              id
            },
          },
          ${Playlists.getFragment('playlists')}
        }
        id
        name
        surname
        ${Age.getFragment('user')}
        ${Playlists.getFragment('user')}
      }
    `
  }
});