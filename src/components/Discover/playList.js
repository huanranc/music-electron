import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../commpon/Loading/loading';
import './discover.scss';
import '../../commpon/icon/font.css';

class PlatListDiscover extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      result: [],
      show: 'none',
      loading: true
    }
  }

  componentDidMount() {
    const date = []
    var myFetchOptions = {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    };
    fetch("/personalized?offset=0&limit=8", myFetchOptions).then(response => {
      if (response.status !== 200) {
        throw new Error('未请求成功，状态码为' + response.status)
      }
      response
        .json()
        .then(json => json.result.map(item => {
          let newItem = {}
          newItem.id = item.id
          newItem.picUrl = item.picUrl
          newItem.name = item.name
          newItem.copywriter = item.copywriter
          date.push(newItem)
          return this.setState({result: [date], loading: false})
        }))
        .catch(error => {
          this.setState({result: ''})
        })
    }).catch(error => {
      this.setState({result: ''})
    })
  }

  showhandle = (key) => {
    this.setState({show: 'block'})
  }
  nonehandle = () => {
    this.setState({show: 'none'})
  }

  render() {
    const {result} = this.state;
    const resultList = result.length
      ? result[0].map((newSong, index) => {
        return <li
          key={index}
          className="play-list"
          onMouseOver={this.showhandle}
          onMouseOut={this.nonehandle}>
          <Link to={`/playlists/${newSong.id}`}>
            <div className="card">
              <div className="card-image image">
                <div
                  className="show"
                  style={{
                  display: this.state.show
                }}>{newSong.copywriter}</div>
                <img alt="example" width="100%" src={newSong.picUrl}/>
              </div>
              <div className="card-body">
                <p>{newSong.name}</p>
              </div>
            </div>
          </Link>
        </li>
      })
      : <Loading title="正在加载..." show={this.state.loading}/>;
    return (
      <div className="recommend">
        <ul className="card-row">{resultList}</ul>
      </div>
    )
  }
}

export default PlatListDiscover
