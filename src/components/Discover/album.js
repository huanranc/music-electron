import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../commpon/Loading/loading';
import './discover.scss';

class AblumDiscover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
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
    fetch("/top/album?offset=0&limit=3", myFetchOptions).then(response => {
      if (response.status !== 200) {
        throw new Error('未请求成功，状态码为' + response.status)
      }
      response
        .json()
        .then(json => json.albums.map(item => {
          let newItem = {}
          newItem.id = item.id
          newItem.picUrl = item.picUrl
          date.push(newItem)
          return this.setState({albums: [date], loading: false})
        }))
        .catch(error => {
          this.setState({albums: ''})
        })
    }).catch(error => {
      this.setState({albums: ''})
    });
  };

  render() {
    const {albums} = this.state;
    const albumsList = albums.length !== 0
      ? albums[0].map((newSong, index) => {
        return <li key={index} className="album-list">
          <Link to={`/albums/${newSong.id}`}>
            <div className="album-image" className={`img${index + 1}`}>
              <img alt="example" width="100%" src={newSong.picUrl}/>
            </div>
          </Link>
        </li>
      })
      : <Loading title="正在加载..." show={this.state.loading}/>;
    return (
      <div className="discover-album">
        <ul>{albumsList}</ul>
      </div>
    )
  }
}

export default AblumDiscover