import React from "react";
import Login from '../Login/login'
import './header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={showLogin:false}
    }
    handleClick() {
        window.history.back();
    }

    login=()=> {
        console.log("这是登录")
        this.setState({
            showLogin:true
        })
    }
    render() {
        return (
            <div className="header">
				<span className="header-back" onClick={this.handleClick}>
          <i className="icon-back"></i>
        </span>
                <div className="header-title">
                    <div className="person">
                        <span className="person-name"  onClick={this.login}>未登录</span>
                        <i className="icon-person"></i>
                    </div>
                </div>
                {this.state.showLogin?<Login/>:""}
            </div>
        );
    }
}

export default Header