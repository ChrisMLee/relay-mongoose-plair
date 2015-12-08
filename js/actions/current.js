import * as types from '../constants/ActionTypes';

export function setSong(songObject, playlistObject) {
  console.log(`setSong was actually called inside action creator song: ${songObject}, playlist: ${playlistObject}`);
  return { type: types.SET_SONG, songObject, playlistObject };
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

export function playNext() {
  console.log('playNext was actually called inside action creator');
  // Can filter through relay items for playlist
  return { type: types.PLAY_NEXT};
}


export function logout() {
  return { type: types.LOGOUT };
}