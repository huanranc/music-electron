import React, {Component} from 'react';
import TabControl from '../Tabs/tabControl';
import {CSSTransition} from "react-transition-group";
import './login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
			showList: false,
			currenUserId:0,
			username: this.props.initusername,
			userlist: this.props.initsonglist
        }
    }
	
	showCureentList = () => {
        if (this.props.show === false) {
            this.props.showList(true)
        } else {
            this.props.showList(false)
        }
    };

	componentWillMount() {
		if (localStorage.userid != '') {
			this.setState({hasLogined: true});
			this.setState({ userid: localStorage.userid});
		}
	}

	loginAll = (e) => {
		e.preventDefault();
		let username = this.refs.loginName.value;
		let password = this.refs.loginPassword.value;
		let data = 'username=' + username + '&password=' + password; 
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
							     //先判断是否登录
								 var myFetch = {
									method: 'GET',
									credentials: 'include',
									mode:'cors'
								};
								fetch("/check", myFetch)
									.then(response => {
										if (response.status !== 200) {
											throw new Error('未请求成功，状态码为' + response.status)
										}
										response.json().then(json => {
											this.setState({currenUserId:json})
											let loginShow=this.state.currenUserId
											console.log(this.props.setLogin(this.state.currenUserId))
								let data='id=' + this.state.currenUserId
								var myFetchOptions = {
									method: 'POST',
									mode:'cors',
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded'
									  },
									credentials: 'include',
									body:data
								};
								fetch("/user/list", myFetchOptions)
            					.then(response => {
               					 if (response.status !== 200) {
                    				throw new Error('未请求成功，状态码为' + response.status)
                				}
                				response.json().then(json => {
														this.setState({userlist:json.result})
														this.props.callback(this.state.userlist)
                				}
                				).catch(error => {
                    				this.setState({userlist: '不存在'})
                				})
           						 }).catch(error => {
            					this.setState({userlist: '请求失败'})
								});
								
										}
										).catch(error => {
											this.setState({currenUserId: ''})
										})
									}).catch(error => {
									this.setState({currenUserId: ''})
								});
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
		// console.log(`username=${username}&password=${password}`);
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
		const {username,userlist} =this.state;
        const userlit=userlist!==undefined?
            userlist.list_name
		:'';
		console.log(userlit)
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
								<div>{userlit}</div>
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