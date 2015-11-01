import Relay from 'react-relay';
import React from 'react';
import Song from './Song'

// https://github.com/transedward/relay-chat/blob/b6ff3c161b855fe900daca1de74e059de1e1e1e7/js/components/ThreadListItem.js

class Playlist extends React.Component {
  render() {
    const { actions } = this.props;
    let playlist = this.props.playlist;
    let songs = playlist.songs.map((song) => {
      return <Song key={song.__dataID__} playlist={playlist} song={song} {...actions }/>;
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

// Fragments: named query snippets that specify what data to fetch for an object of a given type. 

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