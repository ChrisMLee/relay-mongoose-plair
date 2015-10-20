import * as types from '../constants/ActionTypes';

export function setSong(text) {
  console.log('setSong was actually called inside action creator', text);
  return { type: types.SET_SONG, text };
}

export function setLogin(userId) {
  console.log('setLogin was actually called inside action creator', userId);
  return { type: types.SET_LOGIN, userId };
}


export function logout() {
  return { type: types.LOGOUT };
}