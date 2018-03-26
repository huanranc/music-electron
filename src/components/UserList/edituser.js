import React, {Component} from 'react';

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
        id:this.props.match.params.id
    }
}


  updateEdit =(id,e) => {
    e.preventDefault();
    let listname = this.refs.listname.value;
    console.log(listname)
    let data='list_name='+listname;
    var myFetchOptions = {
      method: 'PATCH',
      mode:'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
          },
      credentials: 'include',
      body:data
  };
  fetch('/edit/user/detail'+id,myFetchOptions)
      .then(response => {
          if (response.status !== 200) {
              throw new Error('未请求成功，状态码为' + response.status)
          }
          response.json().then(json => {})
        })
  }
    render() {
      return (
        <div className="content-layout">
            <div className="discover-list">
                <h3 className="top-title">编辑歌单信息</h3>
                <label>歌单名称：</label><input ref="listname" type="text" />
                <button onClick={this.updateEdit.bind(this,this.state.id)}>保存</button><button>取消</button>
            </div>
        </div>
    );
    }
};

export default EditUser;