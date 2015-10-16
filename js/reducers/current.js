import { SET_SONG } from '../actions/current';


const initialState = {
  currentSong : {name: "Cool Song"}
};

export default function current(state = initialState, action) {
  switch (action.type) {
  case SET_SONG:
    console.log('somebody tried to set a song');
    return {
      ...state,
      currentSong: {name: action.song}
    }
  default:
    return state
  }
}