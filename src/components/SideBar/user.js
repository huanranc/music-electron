import React, {Component} from 'react';
import './nav.scss';

class User extends Component {
    constructor(props) {
        super(props);
        this.id=0;
        this.state = {
            userlist:[]
        }
    }

    render() {
        let data='id=' + localStorage.getItem('userid')
        var myFetchOptions = {
			method: 'POST',
			mode:'cors',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			  },
			credentials: 'include',
			body:data
		};
        if(localStorage.getItem('userid')!==this.id) {
          fetch("/user/list", myFetchOptions)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('未请求成功，状态码为' + response.status)
            }
            response.json().then(json => {
                return this.setState({userlist:json.result})
            }
            ).catch(error => {
                this.setState({userlist: '不存在'})
            })
        }).catch(error => {
        this.setState({userlist: '请求失败'})
    });
        }
        const {userlist} =this.state;
        const userlit=userlist?
            <li>{userlist.list_name}</li>
        :''
        return (
           <nav>
             {userlit}
           </nav>
        )
    };
}

export default User;