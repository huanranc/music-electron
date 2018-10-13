import {connect} from "react-redux";
import {changeSong, setSongs} from "../redux/action";
import charts from "../components/List/charts";

//更新state
const mapDispatchToProps = (dispatch) => ({
    changeCurrentSong: (song) => {
        dispatch(changeSong(song));
    },
    setSongs: (songs) => {
        dispatch(setSongs(songs));
    }
});

export default connect(null, mapDispatchToProps)(charts)