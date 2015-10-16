import Relay from 'react-relay';
import React from 'react';

class Song extends React.Component {
  render() {
    let song = this.props.song;
    return (
      <li>
        <h4>{song.artist}</h4>
        <p>{song.name}</p>
      </li>
    );
  }
}

export default Relay.createContainer(Song, {
  fragments: {
    // this is what your props are asking for
    song: () => Relay.QL`
      fragment on Song {
        id
        name
        artist
      }`
  }
});