import * as types from '../constants/ActionTypes';

export function setSong(songObject) {
  console.log('setSong was actually called inside action creator', songObject);
  return { type: types.SET_SONG, songObject };
}

export function setLogin(userId) {
  console.log('setLogin was actually called inside action creator', userId);
  return { type: types.SET_LOGIN, userId };
}


export function setPlaylist(playlistId) {
  console.log('setPlaylist was actually called inside action creator', playlistId);
  // Can filter through relay items for playlist
  return { type: types.SET_PLAYLIST, playlistId };
}


export function logout() {
  return { type: types.LOGOUT };
}