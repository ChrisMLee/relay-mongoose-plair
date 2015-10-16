import Relay from 'react-relay';
import Playlist from './Playlist.js';
import React from 'react';

class Playlists extends React.Component {
  render() {
    let user = this.props.user;
    const { actions } = this.props;

    let playlists = user.playlists.map((playlist) => {
      return <Playlist key={playlist.__dataID__} playlist={playlist} actions={actions}/>;
    });

    return (<div>
              <h1>Playlists</h1>
              <ul>{playlists}</ul>
            </div>);
  }
}

export default Relay.createContainer(Playlists, {
  fragments: {
    user: () => Relay.QL`
      fragment users on User {
        playlists {
          ${Playlist.getFragment('playlist')}
        }
      }`
  }
});