import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './playlist.scss';
import Loading from '../../commpon/Loading/loading';
import LazyLoad from "react-lazyload";

class PlayList extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      loading: true,
      playlists: []
    }
  }

  componentDidMount() {
    const date = []
    if (!this.props.match.isExact) {
      this.setState({loading: false});
    }
    var myFetchOptions = {
      method: 'GET'
    };
    fetch('/top/playlist/highquality?offset=0&limit=52', myFetchOptions).then(response => {
      if (response.status !== 200) {
        throw new Error('未请求成功，状态码为' + response.status)
      }
      response
        .json()
        .then(json => json.playlists.map(item => {
          let newItem = {};
          newItem.id = item.id
          newItem.coverImgUrl = item.coverImgUrl
          newItem.name = item.name
          date.push(newItem)
          return this.setState({playlists: [date], loading: false})
        }))
        .catch(error => {
          this.setState({playlists: ''})
        })
    }).catch(error => {
      this.setState({playlists: ''})
    });
  };

  changeCats = () => {
    const date = []
    if (!this.props.match.isExact) {
      this.setState({loading: false});
    }
    var myFetchOptions = {
      method: 'GET'
    };
    fetch('/top/playlist/highquality?offset=0&limit=8&cat=华语', myFetchOptions).then(response => {
      if (response.status !== 200) {
        throw new Error('未请求成功，状态码为' + response.status)
      }
      response
        .json()
        .then(json => json.playlists.map(item => {
          let newItem = {};
          newItem.id = item.id
          newItem.coverImgUrl = item.coverImgUrl
          newItem.name = item.name
          date.push(newItem)
          return this.setState({playlists: [date], loading: false})
        }))
        .catch(error => {
          this.setState({playlists: ''})
        })
    }).catch(error => {
      this.setState({playlists: ''})
    });
  }

  changeCats2 = () => {
    const date = []
    if (!this.props.match.isExact) {
      this.setState({loading: false});
    }
    var myFetchOptions = {
      method: 'GET'
    };
    fetch('/top/playlist/highquality?cat=流行', myFetchOptions).then(response => {
      if (response.status !== 200) {
        throw new Error('未请求成功，状态码为' + response.status)
      }
      response
        .json()
        .then(json => json.playlists.map(item => {
          let newItem = {};
          newItem.id = item.id
          newItem.coverImgUrl = item.coverImgUrl
          newItem.name = item.name
          date.push(newItem)
          return this.setState({playlists: [date], loading: false})
        }))
        .catch(error => {
          this.setState({playlists: ''})
        })
    }).catch(error => {
      this.setState({playlists: ''})
    });
  }

  changeCats3 = () => {
    const date = []
    if (!this.props.match.isExact) {
      this.setState({loading: false});
    }
    var myFetchOptions = {
      method: 'GET'
    };
    fetch('/top/playlist/highquality?cat=摇滚', myFetchOptions).then(response => {
      if (response.status !== 200) {
        throw new Error('未请求成功，状态码为' + response.status)
      }
      response
        .json()
        .then(json => json.playlists.map(item => {
          let newItem = {};
          newItem.id = item.id
          newItem.coverImgUrl = item.coverImgUrl
          newItem.name = item.name
          date.push(newItem)
          return this.setState({playlists: [date], loading: false})
        }))
        .catch(error => {
          this.setState({playlists: ''})
        })
    }).catch(error => {
      this.setState({playlists: ''})
    });
  }

  changeCats4 = () => {
    const date = []
    if (!this.props.match.isExact) {
      this.setState({loading: false});
    }
    var myFetchOptions = {
      method: 'GET'
    };
    fetch('/top/playlist/highquality?cat=轻音乐', myFetchOptions).then(response => {
      if (response.status !== 200) {
        throw new Error('未请求成功，状态码为' + response.status)
      }
      response
        .json()
        .then(json => json.playlists.map(item => {
          let newItem = {};
          newItem.id = item.id
          newItem.coverImgUrl = item.coverImgUrl
          newItem.name = item.name
          date.push(newItem)
          return this.setState({playlists: [date], loading: false})
        }))
        .catch(error => {
          this.setState({playlists: ''})
        })
    }).catch(error => {
      this.setState({playlists: ''})
    });
  }

  render() {
    const {playlists} = this.state;
    const resultList = playlists.length
      ? playlists[0].map((newSong, index) => {
        return <li key={index} className="playlist">
          <Link to={`/playlists/${newSong.id}`}>
            <div className="card">
              <div className="card-image">
                <LazyLoad height={179}>
                  <img alt="example" width="100%" height="100%" src={newSong.coverImgUrl}/>
                </LazyLoad>
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
      <div className="content-layout">
        <h2>歌单</h2>
        <p>
          <span className="play-list-tags">热门标签:</span>
          <span onClick={this.changeCats}>华语
          </span>
          <span onClick={this.changeCats2}>流行
          </span>
          <span onClick={this.changeCats3}>摇滚
          </span>
          <span onClick={this.changeCats4}>轻音乐
          </span>
        </p>
        <ul className="card-row">
          {resultList}
        </ul>
      </div>
    )
  }
}

export default PlayList;
