import { SET_SONG, SET_LOGIN, LOGOUT } from '../constants/ActionTypes.js';

// https://medium.com/@clayallsopp/making-tucci-the-technical-details-cc7aded6c75f

const initialState = {
  currentSong : {title: 'Xscape - Just Kickin It', youtubeLink: 'https://www.youtube.com/watch?v=w_BTEFAVwjU'},
  currentUser : {id: ''},
  playing: false
};

export default function current(state = initialState, action) {
  console.log('Reducer was called with args', action.type);
  switch (action.type) {
  case SET_SONG:
    return {
      ...state,
      currentSong: {title: action.songObject.title, youtubeLink: action.songObject.youtubeLink},
      playing: true
    }
  case SET_LOGIN:
    return {
      ...state,
      currentUser: {id: action.userId}
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