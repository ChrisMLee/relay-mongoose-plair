import { SET_SONG, SET_PLAYLIST, SET_LOGIN, LOGOUT, PLAY_NEXT } from '../constants/ActionTypes.js';

// https://medium.com/@clayallsopp/making-tucci-the-technical-details-cc7aded6c75f

const initialState = {
  currentSong : {title: '', youtubeLink: '',id: '', playlist:[]},
  currentUser : {id: ''},
  currentPlaylist: {id: ''},
  playing: false
};

export default function current(state = initialState, action) {
  console.log('Reducer was called with args', action.type);
  switch (action.type) {
  case SET_SONG:
    console.log('SET_SONG called with action.playlistObject:,', action.playlistObject);
    console.log('SET_SONG called with action.songObject:,', action.songObject);
    return {
      ...state,
      currentSong: {title: action.songObject.title, youtubeLink: action.songObject.youtubeLink, id:action.songObject.id, playlist: action.playlistObject},
      playing: true
    }
  case SET_PLAYLIST:
    console.log('SET_PLAYLIST was called', action.playlistId);
    return{
      ...state,
      currentPlaylist: {id: action.playlistId}
    }
  case SET_LOGIN:
    return {
      ...state,
      currentUser: {id: action.userId}
    }
  case PLAY_NEXT:
    let currentSongId = state.currentSong.id;
    console.log('The currentSongId', currentSongId);
    let currentSongIndex = state.currentSong.playlist.songs.map(function(song) { return song.id; }).indexOf(currentSongId);
    console.log('The currentSongIndex', currentSongIndex);
    let currentPlaylist = state.currentSong.playlist;
    console.log('The currentPlaylist', currentPlaylist);
    if (currentSongIndex < currentPlaylist.songs.length - 1 ){
      let nextSong = currentPlaylist.songs[currentSongIndex + 1];
      return {
      ...state,
      currentSong: {title:  nextSong.title, youtubeLink:  nextSong.youtubeLink, id: nextSong.id, playlist: currentPlaylist}
      }
    } else{
      return {
      ...state
      }
    }
  case LOGOUT:
    return {
      ...state,
      currentUser: {id: ''}
    }
  default:
    return state
  }
}