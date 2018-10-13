import React, {Component} from 'react';
import Login from '../../containers/Login';
import {NavLink} from 'react-router-dom';
import CreateList from '../../components/CreateList/createlist';
import './user.scss';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            name:'未登录',
            songlist:[],
            create:false,
            currenUserId:0,
        }
    }

    showList = (status) => {
        this.setState({
            show: status
        })
    }

    changeStatus = (newusername) => {
        this.setState({
            name:newusername
        })
    }

    showCureentList = () => {
        if (this.state.show === false) {
            this.setState({show:true})
        } else {
            this.setState({show:false})
        }
    };

    showCreate = () => {
        if(this.state.create === false) {
            this.setState({create:true})
        } else {
            this.setState({create:false})
        }
    }

    createList = (status) => {
        this.setState({
            create: status
        })
    }

    changeList = (newlist) => {
        this.setState({
            songlist:newlist
        })
    }

    changeNewList = (newlist) =>{
        this.setState({
            songlist:newlist
        })
    }

    //删除歌单
    deleList=(id,e) => {
        // console.log(id);
        var myFetchOptions = {
            method: 'PATCH',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
                },
            credentials: 'include'
        };
        fetch('/user/list/del'+id,myFetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
                }
                response.json().then(json => {
                    //先判断是否登录
                    var myFetch = {
                        method: 'GET',
                        credentials: 'include',
                        mode: 'cors'
                    };
                    fetch("/check", myFetch).then(response => {
                        if (response.status !== 200) {
                            throw new Error('未请求成功，状态码为' + response.status)
                        }
                        response.json().then(json => {
                                this.setState({currenUserId: json.user_id});
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
                                                        this.setState({songlist: json.result})
                                                    })
                                                    .catch(error => {
                                                        this.setState({songlist: '不存在'})
                                                    })
                                            }).catch(error => {
                                                this.setState({songlist: '请求失败'})
									});
                            })
                    })
            })
    })
}

//退出
// http://localhost:3000/loginout
loginout = () =>  {
    var myFetch = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
    };
    fetch("/loginout", myFetch)
    .then(response => {
        if (response.status !== 200) {
            throw new Error('未请求成功，状态码为' + response.status)
        }
        response.json().then(json =>{
            this.setState({
                name:'未登录',
                currenUserId: json.user_id,
                songlist:''
            })
        })
    })
}



    render() {
        const userlist=this.state.songlist?
        this.state.songlist.map((list,index) => {
             return <li key={index} className="user-list"><NavLink to={`/userlist/${list.id}`}>{list.list_name}</NavLink>{index===0?'':<i className="icon-delete createlist-dele" onClick={this.deleList.bind(this,list.id)}></i>}</li>
         }):'';
        //console.log(userlist)
        return (
           <div className="user">
                <div className="user-login">
                    <span className="person-name"  onClick={this.showCureentList}>{this.state.name}</span>
                    {
                        this.state.name !=='未登录'?
                        <span className="pserson-text user-title" onClick={this.loginout}>&nbsp;&nbsp;退出</span>
                        :
                        ""
                    }
               </div>
               <span className="user-title" onClick={this.showCreate}>创建歌单 +</span>
               <ul>
                    {userlist}
               </ul>
               <Login showList={this.showList} show={this.state.show} initusername={this.state.name} callbackstatus={this.changeStatus} initsonglist={this.state.changeList} callback={this.changeList}/>
               <CreateList createList={this.createList} create={this.state.create}  newsonglist={this.state.changeList}  callbacknew={this.changeList}/>
           </div>
        )
    };
}

export default User;