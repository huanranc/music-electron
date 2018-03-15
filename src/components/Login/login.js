import React, {Component} from 'react';
import TabControl from '../Tabs/tabControl';
import {CSSTransition} from "react-transition-group";
import './login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false
        }
    }
	
	showCureentList = () => {
        if (this.props.show === false) {
            this.props.showList(true)
        } else {
            this.props.showList(false)
        }
    };


    render() {
        return (
			<CSSTransition in={this.props.show} classNames="fade" transitionEnterTimeout={300}
			transitionLeaveTimeout={300}
			onEnter={() => {
				this.setState({showList: true});
			}}
			onExited={() => {
				this.setState({showList: false});
			}}>
            	<div  style={this.state.showList === true ? {display: "block"} : {display: "none"}} className="login">
				<i className="icon-删除 login-dele" onClick={this.showCureentList}></i>
                <TabControl>
                    <div name="登录">
                        <div>
							<form>
								<label>
									<input placeholder="请输入您的账号"/>
								</label>
								<label>
									<input type="password" placeholder="请输入您的密码" />
									</label>
								<button type="submit">登录</button>
							</form>
						</div>
                    </div>
                    <div name="注册">
                        <div>
							<form>
								<label>
									<input placeholder="请输入您的账号" />
								</label>
								<label>
									<input type="password" placeholder="请输入您的密码" />
								</label>
								<label>
									<input type="password" placeholder="请输入您的密码" />
								</label>
								<button type="submit">注册</button>
							</form>
						</div>
                    </div>
                </TabControl>
            	</div>
			</CSSTransition>	
        )
    }
}

export default Login;