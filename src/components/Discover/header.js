import React from "react";
import Login from '../../containers/Login'
import './header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            name:'未登录'
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

    changeStatus = (newusername) => {
        this.setState({
            name:newusername
        })
    }

    handleClick() {
        window.history.back();
    }
    render() {
        // console.log(this.state.username)
        return (
            <div className="header">
				<span className="header-back" onClick={this.handleClick}>
          <i className="icon-back"></i>
        </span>
                <div className="header-title">
                    <div className="person">
                        <span className="person-name"  onClick={this.showCureentList}>{this.state.name}</span>
                    </div>
                </div>
                <Login showList={this.showList} show={this.state.show} initusername={this.state.name} callbackstatus={this.changeStatus}/>
            </div>
        );
    }
}

export default Header