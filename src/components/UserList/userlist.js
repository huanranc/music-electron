import React, {Component} from 'react';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result:[],
            username:'',
            id:this.props.id
        }
    }

    componentDidMount() {
        this.presondetails();
      }
  
      presondetails() {
        let myFetch = {
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
                    this.setState({currenUserId:json.user_id})
        let data='id=' + this.state.currenUserId;
        let myFetchOptions = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
            credentials: 'include',
            body:data
        };
        if(this.state.currenUserId!==undefined) {
            fetch("/user", myFetchOptions)
                    .then(response => {
                            if (response.status !== 200) {
                                throw new Error('未请求成功，状态码为' + response.status)
                        }
                        response.json().then(json => {
                                this.setState({username:json.username});
                        }
                        ).catch(error => {
                                this.setState({username: ''})
                        })
                        }).catch(error => {
                    this.setState({username: ''})
        });

        let id='list_id='+this.state.id;
        let myFetch = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
            credentials: 'include',
            body:id
        };
        fetch("/user/detail", myFetch)
        .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
            }
            response.json().then(json => {
                    this.setState({result:json.result});
            }
            ).catch(error => {
                    this.setState({result: ''})
            })
            }).catch(error => {
        this.setState({result: ''})
        });

     }
                }
                ).catch(error => {
                    this.setState({currenUserId: ''})
                })
            }).catch(error => {
            this.setState({currenUserId: ''})
        });
      }

      timeCreate(time) {
        let unix = time*1000
        let unixTime = new Date(unix)
        let y = unixTime.getFullYear()
        let m = (unixTime.getMonth() + 1) > 10 ? (unixTime.getMonth() + 1) : '0' + (unixTime.getMonth() + 1)
        let d = unixTime.getDate() > 10 ? unixTime.getDate() : '0' + unixTime.getDate()
        return y + '-' + m + '-' + d
    }

    render() {
        const {username,result} =this.state;
        const detail=result.length>0?    
        result.map((message,index)=>{
            return <div className="bk-info" key={index}>
                    <div className="bk-name">
                        <h2 className="bk-infr-name">{message.list_name}</h2>
                        <div className="bk-intr">
                            <div className="intr-art-name">
                                <span className="top-title">{this.state.username}</span>
                            </div>
                            <div className="intr-create-time intr-playlist-create-time">
                                {this.timeCreate((message.add_time))} 创建
                            </div>
                        </div>
                        <div className="intr-control">
                                <a className="bk-collect">编辑</a>
                        </div>
                    </div>
                 </div>
        }):'';
        return (
            <div className="bk">
                   {detail}
            </div>
        );
    }
};

export default UserList;