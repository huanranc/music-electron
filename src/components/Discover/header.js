import React from "react";
import Login from '../Login/login'
import './header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    showList = (status) => {
        this.setState({
            show: status
        })
    }

    showCureentList = () => {
        if (this.state.show === false) {
            this.setState({show:true})
        } else {
            this.setState({show:false})
        }
    };

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
                        <span className="person-name"  onClick={this.showCureentList}>未登录</span>
                    </div>
                </div>
                <Login showList={this.showList} show={this.state.show}/>
            </div>
        );
    }
}

export default Header