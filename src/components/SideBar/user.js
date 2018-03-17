import React, {Component} from 'react';
import Login from '../../containers/Login'
import './user.scss';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            name:'未登录',
            songlist:[]
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

    changeList = (newlist) => {
        this.setState({
            songlist:newlist
        })
    }

    render() {
        const userlist=this.state.songlist!==0?
        this.state.songlist.map((list,index) => {
             return <li key={index} className="user-list">{list.list_name}</li>
         }):'';
        
        return (
           <div className="user">
                <div className="user-login">
                    <span className="person-name"  onClick={this.showCureentList}>{this.state.name}</span>
               </div>
               <span className="user-title">创建歌单 +</span>
               <ul>
                    {userlist}
               </ul>
               <Login showList={this.showList} show={this.state.show} initusername={this.state.name} callbackstatus={this.changeStatus} initsonglist={this.state.changeList} callback={this.changeList}/>
           </div>
        )
    };
}

export default User;