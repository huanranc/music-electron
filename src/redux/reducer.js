import {combineReducers} from 'redux';
import * as actionType from './actionTypes';
// import * as Status from './status.js';

//初始状态
const initialState={
  //单曲
  song:{},
  //列表
  songs:[],
  //currttime
  currentTime:0,
  showSong:false
};

//拆分reducer

//修改当前播放的歌曲

function song(state=initialState.song,action) {
  switch(action.type) {
    case actionType.CHANGE_SONG:
      return action.song
    default:
      return state
  }
}

//得到当前currentTime
function currentTime(state=initialState.currentTime,action) {
  switch(action.type) {
    case actionType.SET_AUDIO_CRRENTTIME:
      return action.currentTime
    default:
      return state
  }
}

//得到当前播放状态
function showSong(state=initialState.showSong,action) {
  switch(action.type) {
    case actionType.SHOW_SONG:
      return action.showSong
    default:
      return state
  }
}

//歌曲列表。移除歌曲

function songList(state=initialState.songs,action){
  switch(action.type){
    case actionType.SET_SONGS:
      return action.songs
    case actionType.REMOVE_SONG:
      return state.filter(song=>song.id!==action.id)
      default:
        return state
  }
}

//合并reducer

const musicReducer=combineReducers({
  song,
  songList,
  currentTime,
  showSong
})

export default musicReducer;

