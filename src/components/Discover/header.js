import React from "react";
import './header.scss';

class Header extends React.Component {
    handleClick() {
        window.history.back();
    }

    render() {
        return (
            <div className="header">
				<span className="header-back" onClick={this.handleClick}>
          <i className="icon-back"></i>
        </span>
                <div className="header-title">
                    <div className="person">
                        <span className="person-name">未登录</span>
                        <i className="icon-person"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header