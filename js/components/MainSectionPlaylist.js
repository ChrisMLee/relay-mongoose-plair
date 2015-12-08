import Relay from 'react-relay';
import React from 'react';

import MainSectionPlaylistSong from './MainSectionPlaylistSong';

class MainSectionPlaylist extends React.Component {
  constructor(props){
    super(props);
    console.log('MainSectionPlaylist', props);
  }
  componentWillReceiveProps(nextProps){
    console.log('MainSectionPlaylist received nextProps', nextProps);
  }
  render(){
    let {playlist, actions} = this.props;

    let songs = playlist.songs.map((song) => {
      return <MainSectionPlaylistSong key={song.__dataID__} playlist={playlist} song={song} actions={actions}/>;
    });

    return (
    <div>
     <p>{playlist.title}</p>
     <ul>
       {songs}
     </ul>
    </div>
    );
  }
}

// <div id="todo-list">
//   {
//     this.props.todos.map( (todo, index) => {
//       return (
//         <div key={index}>
//           <span>{todo}</span>
        
//           <button data-id={index} onClick={this.handleDelete}>
//             X
//           </button>
//           <button data-id={index} onClick={this.handleEdit}>
//             Edit
//           </button>
//         </div>
//       );
//     })
//   }
// </div>


// TODO
// songs - some component get fragment songs
// song - ^ get the fragment off of this - click and it plays the track

export default Relay.createContainer(MainSectionPlaylist, {
  fragments: {
    playlist: () => Relay.QL`
      fragment on Playlist {
        title
        id
        type
        songs{
          id
          title
          youtubeLink
          ${MainSectionPlaylistSong.getFragment('song')}
        }
      }
    `
  }
});