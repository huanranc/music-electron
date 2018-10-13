import {connect} from "react-redux";
import {changeSong, setSongs} from "../redux/action";
import Search from "../components/Search/search";

//更新state
const mapDispatchToProps = (dispatch) => ({
  changeCurrentSong: (song) => {
    dispatch(changeSong(song));
  },
  setSongs: (songs) => {
    dispatch(setSongs(songs));
  }
});

export default connect(null, mapDispatchToProps)(Search)