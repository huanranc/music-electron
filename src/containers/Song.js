import {connect} from "react-redux"
import { changeSong, setSongs} from "../redux/action"
import SongLy from "../components/Song/lyric";

//映射state到Song上
const mapStateToProps = (state) => ({
	currentSong: state.song,
	currentSongList: state.songList
});

//更新state
const mapDispatchToProps = (dispatch) => ({
	changeCurrentSong: (song) => {
		dispatch(changeSong(song));
	}
});

//注入dispatch和state到song组件里
export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(SongLy)