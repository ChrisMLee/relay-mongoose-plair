import * as types from '../constants/ActionTypes';

export function setSong(text) {
  return { type: types.SET_SONG, text };
}