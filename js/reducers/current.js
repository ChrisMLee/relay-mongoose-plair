import { SET_SONG } from '../constants/ActionTypes.js';

// https://medium.com/@clayallsopp/making-tucci-the-technical-details-cc7aded6c75f

const initialState = {
  currentSong : {name: "Cool Song"},
  currentUser : {id: '562592cfde07141f228bbd7f'}
};

export default function current(state = initialState, action) {
  console.log('Reducer was called with args', action.type);
  switch (action.type) {
  case SET_SONG:
    return {
      ...state,
      currentSong: {name: action.text}
    }
  default:
    return state
  }
}