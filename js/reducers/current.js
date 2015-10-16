import { SET_SONG } from '../actions/current';


const INITIAL_STATE = {
  currentSong : {}
};

export default function current(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_SONG:
    return {
      ...state,
      currentSong: action.song
    }
  default:
    return state
  }
}