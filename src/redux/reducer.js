import {combineReducers} from 'redux';
import * as actionType from './actionTypes';

//初始状态
const initialState={
  //单曲
  song:{},
  //列表
  songs:[]
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

//合并reducer

const musicReducer=combineReducers({
  song,
  songList
})

export default musicReducer;

