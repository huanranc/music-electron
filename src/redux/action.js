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

//设置currenttime
export function setCurrentTime(currentTime) {
  return {
    type: actionType.SET_AUDIO_CRRENTTIME,
    currentTime
  }
}

//设置当前歌曲的

// export const fetchStarted = () => ({
//   type: actionType.FETCH_STARTED
// });

// export const fetchSuccess = (result) => ({
//   type: actionType.FETCH_SUCCESS,
//   result
// })

// export const fetchFailure = (error) => ({
//   type: actionType.FETCH_FAILURE,
//   error
// })
// //获取歌词

// export const  getLyc = (code) => {
//   return (dispatch) => {
//     const apiUrl = `/lyric?id=${code}`
//     let myFetchOptions ={
//       method:'GET'
//     };
//     dispatch(fetchStarted())

//     return fetch(apiUrl,myFetchOptions).then((response) => {
//       if (response.status !== 200) {
//         throw new Error('Fail to get response with status ' + response.status);
//       }

//       response.json().then((responseJson) => {
//         dispatch(fetchSuccess(responseJson.lrc));
//       }).catch((error) => {
//         dispatch(fetchFailure(error));
//       });
//     }).catch((error) => {
//       dispatch(fetchFailure(error));
//     })
//   };
// }