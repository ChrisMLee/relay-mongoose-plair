import Relay from 'react-relay';
import React from 'react';

class Song extends React.Component {
  render() {
    const {setSong} = this.props;
    console.log('guess what I was created with these props', this.props);
    let song = this.props.song;
    return (
      <li onClick={() => {setSong(song.name);} }>
        <h4>{song.artist}</h4>
        <p>{song.name}</p>
      </li>
    );
  }
}


export default Relay.createContainer(Song, {
  fragments: {
    // this is 'this.props.song' is asking for
    // 'fragment on Song' is a fragment on the Song component 
    song: () => Relay.QL`

      fragment on Song {
        id
        name
        artist
      }`
  }
});