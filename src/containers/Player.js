import {connect} from "react-redux"
import {changeSong, setCurrentTime, setShowSong} from "../redux/action"
import Player from "../components/Play/play";

//映射state到play上
const mapStateToProps = (state) => ({
  currentSong: state.song,
  currentSongList: state.songList,
  currentTime: state.currentTime,
  showSong: state.showSong,
  songIndex: state.songIndex
});

//更新state
const mapDispatchToProps = (dispatch) => ({
  changeCurrentSong: (song) => {
    dispatch(changeSong(song));
  },
  setCurrentTime: (currentTime) => {
    dispatch(setCurrentTime(currentTime))
  },
  setShowSong: (showSong) => {
    dispatch(setShowSong(showSong))
  }
  // setSongIndex:(songIndex) => {     dispatch(setSongIndex(songIndex)) }
});

//注入dispatch和state到player组件里
export default connect(mapStateToProps, mapDispatchToProps)(Player)