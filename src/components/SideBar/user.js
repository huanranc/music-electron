import React, {Component} from 'react';
import Login from '../../containers/Login';
import CreateList from '../../components/CreateList/createlist';
import './user.scss';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            name:'未登录',
            songlist:[],
            create:false
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



    render() {
        const userlist=this.state.songlist!==0?
        this.state.songlist.map((list,index) => {
             return <li key={index} className="user-list">{list.list_name}</li>
         }):'';
        //console.log(userlist)
        return (
           <div className="user">
                <div className="user-login">
                    <span className="person-name"  onClick={this.showCureentList}>{this.state.name}</span>
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