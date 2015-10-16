import Relay from 'react-relay';
import React from 'react';
import Song from './Song'

class Playlist extends React.Component {
  render() {
    let playlist = this.props.playlist;
    let songs = playlist.songs.map((song) => {
      return <Song key={song.__dataID__} song={song} />;
    });
    return (
      <li>
        <p>{playlist.title}</p>
        <ul>
          {songs}
        </ul>
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
        songs{
          ${Song.getFragment('song')}
        }
      }`
  }
});