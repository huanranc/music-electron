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


//设置当前是否播放
export function setShowSong(showSong) {
    return {
        type: actionType.SHOW_SONG,
        showSong
    }
}


//设置当前是否登录
export function setLogin(login) {
    return {
        type: actionType.LOGIN,
        login
    }
}

// //album
// export function fetchAlbum(){
//   return async dispatch => {
//     const date=[];
//     var myFetchOptions ={
//       method:'GET',
//       header: {'content-type':'application/json; charset=utf-8'}
//     };
//     await  fetch("/top/album?offset=0&limit=52",myFetchOptions)
//     .then(response => {
//       if(response.status!==200){
//         throw new Error('未请求成功，状态码为'+response.status)
//       }
//       response.json().then(json => json.albums.map(item=>{
//       let newItem={}
//           newItem.id=item.id
//           newItem.name=item.name
//           newItem.artName=item.artist.name
//           newItem.picUrl=item.picUrl
//           newItem.size=item.size
//           date.push(newItem)
//       return dispatch({ type: FactionType.GET_AlBUM_LIST, payload: date })
//       })
//       ).catch(error=>{this.setState({albums:''})})
//     }).catch(error=>{this.setState({albums:''})});
//   }
// }


