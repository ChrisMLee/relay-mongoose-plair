import Relay from 'react-relay';
import React from 'react';

import DeleteSongMutation from '../mutations/DeleteSongMutation';

class MainSectionPlaylistSong extends React.Component {
  constructor(props){
    super(props);
    console.log('MainSectionPlaylistSong', props);
  }
  deleteSong(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    Relay.Store.update(new DeleteSongMutation({
      playlistId: this.props.playlist.id,
      songId: this.props.song._id
    }));
  }
  render(){
    let {song, playlist, actions} = this.props;
    return (
      <li style={styles.songStyle} onClick={() => {actions.setSong(song, playlist);} }>
        <h4>{song.title}</h4>
        <button onClick={this.deleteSong.bind(this)}>x</button>
      </li>
    );
  }
}

export default Relay.createContainer(MainSectionPlaylistSong, {
  fragments: {
    song: () => Relay.QL`
      fragment on Song {
        _id
        id
        title
        youtubeLink
      }
    `
  }
});

const styles = {
  songStyle: {
    cursor: 'pointer'
  }
}