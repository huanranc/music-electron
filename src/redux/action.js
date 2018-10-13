import * as actionType from './actionTypes';

//修改当前播放歌曲
export function changeSong(song) {
  return {type: actionType.CHANGE_SONG, song}
}

//设置当前播放歌曲列表
export function setSongs(songs) {
  return {type: actionType.SET_SONGS, songs}
}

//从当前播放歌曲列表中移除
export function removeSong(id) {
  return {type: actionType.REMOVE_SONG, id}
}

//设置currenttime
export function setCurrentTime(currentTime) {
  return {type: actionType.SET_AUDIO_CRRENTTIME, currentTime}
}

// //设置当前播放的index export function setSongIndex(songIndex) {     return {
// type: actionType.SET_SONG_INDX,         songIndex     } } 设置当前是否播放
export function setShowSong(showSong) {
  return {type: actionType.SHOW_SONG, showSong}
}

//设置当前是否登录
export function setLogin(login) {
  return {type: actionType.LOGIN, login}
}
