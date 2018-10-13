import {connect} from "react-redux";
import {changeSong, setSongs} from "../redux/action";
import SongList from "../components/PlayList/songList";

const mapStateToProps = (state) => ({
    currentSong: state.song,
    currentSongList: state.songList
});
//更新state
const mapDispatchToProps = (dispatch) => ({
    changeCurrentSong: (song) => {
        dispatch(changeSong(song));
    },
    setSongs: (songs) => {
        dispatch(setSongs(songs));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SongList)