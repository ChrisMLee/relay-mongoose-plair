import Relay from 'react-relay';
import React from 'react';

class Song extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const {setSong} = this.props;
    console.log('guess what I was created with these props', this.props);
    let song = this.props.song;
    return (
      <li onClick={() => {setSong(song);} }>
        <h4>{song.title}</h4>
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
        _id
        id
        title
        youtubeLink
      }`
  }
});