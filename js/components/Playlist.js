import Relay from 'react-relay';
import React from 'react';
import Song from './Song'

// https://github.com/transedward/relay-chat/blob/b6ff3c161b855fe900daca1de74e059de1e1e1e7/js/components/ThreadListItem.js

class Playlist extends React.Component {
  constructor(props){
    super(props);
  }
  setPlaylist(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const {actions, playlist} = this.props;
    actions.setPlaylist(playlist.id);
  }
  render() {
    const { actions } = this.props;
    let playlist = this.props.playlist;
    let songs = playlist.songs.map((song) => {
      return <Song key={song.__dataID__} playlist={playlist} song={song} {...actions }/>;
    });
    return (
      <li style={styles.playlistStyle} onClick={this.setPlaylist.bind(this)}>
        <p>{playlist.title}</p>
      </li>
    );
  }
}

 // <ul>
 //          {songs}
 //        </ul>

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

const styles = {
  playlistStyle: {
    cursor: 'pointer'
  }
}