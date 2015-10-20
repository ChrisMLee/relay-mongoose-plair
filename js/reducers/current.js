import { SET_SONG, SET_LOGIN } from '../constants/ActionTypes.js';

// https://medium.com/@clayallsopp/making-tucci-the-technical-details-cc7aded6c75f

const initialState = {
  currentSong : {name: "Cool Song"},
  currentUser : {id: ''}
};

export default function current(state = initialState, action) {
  console.log('Reducer was called with args', action.type);
  switch (action.type) {
  case SET_SONG:
    return {
      ...state,
      currentSong: {name: action.text}
    }
  case SET_LOGIN:
    return {
      ...state,
      currentUser: {id: action.userId}
    }
  default:
    return state
  }
}