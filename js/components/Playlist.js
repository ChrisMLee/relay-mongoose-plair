import Relay from 'react-relay';
import React from 'react';

class Playlist extends React.Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <li>
        <p>{playlist.title}</p>
      </li>
    );
  }
}

export default Relay.createContainer(Playlist, {
  fragments: {
    playlist: () => Relay.QL`
      fragment on Playlist {
        id
        title
      }`
  }
});