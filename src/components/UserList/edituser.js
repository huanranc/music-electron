import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import './edituser.scss';

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id
    }
  }

  updateEdit = (id, e) => {
    e.preventDefault();
    let listname = this.refs.listname.value;
    console.log(listname)
    let data = 'list_name=' + listname;
    var myFetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
      body: data
    };
    fetch('/edit/user/detail' + id, myFetchOptions).then(response => {
      if (response.status !== 200) {
        throw new Error('未请求成功，状态码为' + response.status)
      }
      response
        .json()
        .then(json => {})
    })

    this
      .props
      .history
      .push(`/userlist/${id}`);
  }

  cancel = (id, e) => {
    this
      .props
      .history
      .push(`/userlist/${id}`);
  }
  render() {
    return (
      <div className="content-layout">
        <div className="discover-list">
          <div className="edituser">
            <h3 className="top-title">编辑歌单信息</h3>
            <div className="form-group">
              <label className="form-control-label">歌单名称</label>
              <input className="form-control" ref="listname" type="text"/>
            </div>
            <div className="btn">
              <button
                className="edituser-btn"
                onClick={this
                .updateEdit
                .bind(this, this.state.id)}>保存</button>
              <button
                className="edituser-btn"
                onClick={this
                .cancel
                .bind(this, this.state.id)}>取消</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(EditUser);