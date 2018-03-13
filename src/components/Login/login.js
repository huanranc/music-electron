import React, {Component} from 'react';
import TabControl from '../Tabs/tabControl';
import './login.scss';

class Login extends Component {
    constructor(props) {
		super(props);
		this.state={
			close:true
		}
	}
	
	closClick=()=>{
		console.log("关闭");
		this.setState({
			close:this.props.show
		})
		console.log(this.props.show);
		console.log(this.state.close);
	}


    render() {
        return (
            <div className="login" style={this.state.close?{display:"block"}:{display:"none"}}>
				<i className="icon-删除 login-dele" onClick={this.closClick}></i>
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
        )
    }
}

export default Login;