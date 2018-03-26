import React from "react";
import Login from '../../containers/Login'
import './header.scss';

class Header extends React.Component {
    handleClick() {
        window.history.back();
    }
    render() {
        // console.log(this.state.username)
        return (
            <div className="header">

            </div>
        );
    }
}

export default Header