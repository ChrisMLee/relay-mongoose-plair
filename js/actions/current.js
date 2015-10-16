import * as types from '../constants/ActionTypes';

export function setSong(text) {
  console.log('setSong was actually called inside action creator', text);
  return { type: types.SET_SONG, text };
}