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
  currentTime:0
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

//歌曲列表。移除歌曲

function songList(state=initialState.songs,action){
  switch(action.type){
    case actionType.SET_SONGS:
      return action.songs
    case actionType.REMOVE_SONG:
      return state.filter(song=>action.id!==song.id)
      default:
        return state
  }
}

// //获取歌词
// function lyc(state={status: Status.LOADING},action) {
//   switch(action.type) {
//     case actionType.FETCH_STARTED: {
//       return {status: Status.LOADING};
//     }
//     case actionType.FETCH_SUCCESS: {
//       return {...state, status: Status.SUCCESS, ...action.result};
//     }
//     case actionType.FETCH_FAILURE: {
//       return {status: Status.FAILURE};
//     }
//     default: {
//       return state;
//     }
//   }
// }

//合并reducer

const musicReducer=combineReducers({
  song,
  songList,
  currentTime
})

export default musicReducer;

