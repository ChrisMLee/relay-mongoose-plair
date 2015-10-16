import { SET_SONG } from '../constants/ActionTypes.js';


const initialState = {
  currentSong : {name: "Cool Song"}
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