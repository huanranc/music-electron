import {connect} from "react-redux"
import {changeSong, removeSong} from "../redux/action"
import List from "../components/Play/playlist";

//映射state到Song上
const mapStateToProps = (state) => ({
    currentSong: state.song,
    currentSongList: state.songList
});

//更新state
const mapDispatchToProps = (dispatch) => ({
    changeCurrentSong: (song) => {
        dispatch(changeSong(song));
    },
    removeSong: (id) => {
        dispatch(removeSong(id))
    }
});

//注入dispatch和state到song组件里
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)