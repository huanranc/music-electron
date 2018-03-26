import React, {Component} from 'react';
import TabControl from '../Tabs/tabControl';
import {CSSTransition} from "react-transition-group";
import './createlist.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createList: false,
            currenUserId:0,
            userlist: this.props.newsonglist
        }
    }
	
	showCureentList = () => {
        if (this.props.create === false) {
            this.props.createList(true)
        } else {
            this.props.createList(false)
        }
    };



    createSongList = (e) => {
		e.preventDefault();
		 //先判断是否登录
         var myFetch = {
            method: 'GET',
            credentials: 'include',
            mode:'cors'
        };
       fetch("/check",myFetch)
            .then(response => {
                if(response.status ===404) {
                    // throw new Error('失败')
                    alert('请登陆');
                    if (this.props.create === false) {
                        this.props.createList(true)
                        } else {
                        this.props.createList(false)
                    }
                }
                else if(response.status ===200){
                    response.json().then(json => {
                    this.setState({currenUserId:json.user_id})
                    let creatname = this.refs.createName.value;
                    let userid = this.state.currenUserId!==0?this.state.currenUserId:'';
                    if(userid!==undefined) {
                        let data = 'listname=' + creatname + '&userid=' + userid; 
                    var myFetchOptions = {
                        method: 'POST',
                        mode:'cors',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                          },
                        credentials: 'include',
                        body:data
                    };
                    fetch("/user/person",myFetchOptions)
                    .then(response => {
                        if (response.status !== 200) {
                            // throw new Error('未请求成功，状态码为' + response.status)
                            alert('请登陆');
                            if (this.props.create === false) {
                                this.props.createList(true)
                                } else {
                                this.props.createList(false)
                            }
                        }
                        response.json().then( json => {
                           if(json.status===200) {
                            let data='id=' + userid;
                            console.log(userid)
                            var myFetch = {
                                method: 'POST',
                                mode:'cors',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                credentials: 'include',
                                body:data
                            };
                            fetch("/user/list", myFetch)
                                     .then(response => {
                                                if (response.status !== 200) {
                                                    throw new Error('未请求成功，状态码为' + response.status)
                                            }
                                            response.json().then(json => {
                                                    this.setState({userlist:json.result})
                                                    this.props.callbacknew(this.state.userlist)
                                                    // console.log(this.state.userlist)
                                            }
                                            ).catch(error => {
                                                    this.setState({userlist: '不存在'})
                                            })
                                            }).catch(error => {
                                        this.setState({userlist: '请求失败'})
                            });
                            alert("歌单创建成功");
                               if (this.props.create === false) {
                                this.props.createList(true)
                                } else {
                                this.props.createList(false)
                                }
                           }else {
                               alert("歌单名重复");
                               if (this.props.create === false) {
                                this.props.createList(true)
                                } else {
                                this.props.createList(false)
                                }
                           }
                        })
                    })
                    } else {
                        alert("请登录");
                        if (this.props.create === false) {
                            this.props.createList(true)
                            } else {
                            this.props.createList(false)
                        }
                    }
                })}
            })
}

    chanclSongList =(e) => {
        e.preventDefault();
        if (this.props.create === false) {
            this.props.createList(true)
        } else {
            this.props.createList(false)
        }
    }

    render() {
        return (
			<CSSTransition in={this.props.create} classNames="fade" timeout={300}
			onEnter={() => {
				this.setState({createList: true});
			}}
			onExited={() => {
				this.setState({createList: false});
			}}>
        <div  style={this.state.createList === true ? {display: "block"} : {display: "none"}} className="createlist">
				<i className="icon-删除 createlist-dele" onClick={this.showCureentList}></i>
					<form>
								<label>
									<input ref="createName" placeholder="歌单标题"/>
								</label>
								<button onClick={this.createSongList}>新建</button>
                <button onClick={this.chanclSongList}>取消</button>
					</form>
        </div>
			</CSSTransition>	
        )
    }
}

export default Login;