import {connect} from "react-redux"
import { changeSong,setCurrentTime,setShowSong} from "../redux/action"
import SongLy from "../components/Song/lyric";

//映射state到Song上
const mapStateToProps = (state) => ({
	currentSong: state.song,
	currentSongList: state.songList,
	currentTime:state.currentTime,
	showSong:state.showSong
});

//更新state
const mapDispatchToProps = (dispatch) => ({
	changeCurrentSong: (song) => {
		dispatch(changeSong(song));
	},
	getcurrentTime:(currentTime)=>{
		dispatch(setCurrentTime(currentTime))
	},
	setShowSong:(showSong)=>{
		dispatch(setShowSong(showSong))
	}
});

//注入dispatch和state到song组件里
export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(SongLy)