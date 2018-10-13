import {connect} from "react-redux"
import {setLogin} from "../redux/action"
import User from "../components/SideBar/user";

//映射state到play上
const mapStateToProps = (state) => ({changelogin: state.login});

//更新state
const mapDispatchToProps = (dispatch) => ({
  setLogin: (login) => {
    dispatch(setLogin(login))
  }
});

//注入dispatch和state到player组件里
export default connect(mapStateToProps, mapDispatchToProps)(User)