import {connect} from "react-redux"
import { changeSong, setSongs} from "../redux/action"
import Player from "../components/Play/play";

//映射state到play上
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

//注入dispatch和state到player组件里
export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Player)