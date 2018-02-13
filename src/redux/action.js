import * as actionType from './actionTypes';

//修改当前播放歌曲
export function changeSong(song) {
  return {
    type: actionType.CHANGE_SONG,
    song
  }
}
//设置当前播放歌曲列表
export function setSongs(songs) {
  return {
    type: actionType.SET_SONGS,
    songs
  }
}
//从当前播放歌曲列表中移除
export function removeSong(id) {
  return {
    type: actionType.REMOVE_SONG,
    id
  }
}