import React, {Component} from 'react';
import TabControl from '../Tabs/tabControl';
import {CSSTransition} from "react-transition-group";
import './login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
			showList: false,
			username: this.props.initusername
        }
    }
	
	showCureentList = () => {
        if (this.props.show === false) {
            this.props.showList(true)
        } else {
            this.props.showList(false)
        }
    };

	loginAll = (e) => {
		e.preventDefault();
		let username = this.refs.loginName.value;
		let password = this.refs.loginPassword.value;
		let data = 'username=' + username + '&password=' + password; 
		console.log(`username=${username}&password=${password}`);
		var myFetchOptions = {
			method: 'POST',
			mode:'cors',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			  },
			credentials: 'include',
			body:data
		};
		fetch("/login",myFetchOptions)
			.then(response => {
				if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
				}
				response.json().then( json => {
						if(json.status===200) {
							this.setState({username:username});
							this.props.callbackstatus(username)
							if (this.props.show === false) {
								this.props.showList(true)
							} else {
								this.props.showList(false)
							}
						} else if(json.status===201){
							alert("密码错误");
							if (this.props.show === false) {
								this.props.showList(true)
							} else {
								this.props.showList(false)
							}
						} else if (json.status === 404) {
							alert("没有注册");
							if (this.props.show === false) {
								this.props.showList(true)
							} else {
								this.props.showList(false)
							}
						}	
					}
				)
			})
	}

	
	registerAll = (e) => {
		e.preventDefault();
		let username = this.refs.regName.value;
		let password = this.refs.regPassword.value;
		let aginpassword = this.refs.regAginPassword.value;
		let data = 'username=' + username + '&password=' + password; 
		console.log(`username=${username}&password=${password}`);
		var myFetchOptions = {
			method: 'POST',
			mode:'cors',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			  },
			credentials: 'include',
			body:data
		};

		fetch("/register",myFetchOptions)
			.then(response => {
				if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
				}
				response.json().then( json => {
						if(json.status===200) {
							if(password === aginpassword) {
								alert("注册成功")
								if (this.props.show === false) {
									this.props.showList(true)
								} else {
									this.props.showList(false)
								}
							} else {
								alert("两次密码不一致")
								if (this.props.show === false) {
									this.props.showList(true)
								} else {
									this.props.showList(false)
								}
							}
						} else if(json.status===201){
							alert("已经注册过了");
							if (this.props.show === false) {
								this.props.showList(true)
							} else {
								this.props.showList(false)
							}
						} 
					}
				)
			})
	}

    render() {
		const {username} =this.state;
        return (
			<CSSTransition in={this.props.show} classNames="fade" timeout={300}
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
							<form onSubmit={this.loginAll}>
								<label>
									<input ref="loginName" placeholder="请输入您的账号"/>
								</label>
								<label>
									<input ref="loginPassword" type="password" placeholder="请输入您的密码" />
									</label>
								<button>登录</button>
							</form>
						</div>
                    </div>
                    <div name="注册">
                        <div>
							<form  onSubmit={this.registerAll}>
								<label>
									<input ref="regName" placeholder="请输入您的账号" />
								</label>
								<label>
									<input ref="regPassword" type="password" placeholder="请输入您的密码" />
								</label>
								<label>
									<input ref="regAginPassword" type="password" placeholder="请输入您的密码" />
								</label>
								<button>注册</button>
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