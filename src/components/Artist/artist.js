import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../commpon/Loading/loading';
import './artist.scss';

class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      loading: true
    }
  }

  componentDidMount() {
    var myFetchOptions = {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    };
    fetch("/top/artists", myFetchOptions).then(response => {
      if (response.status !== 200) {
        throw new Error('未请求成功，状态码为' + response.status)
      }
      response
        .json()
        .then(json => {
          this.setState({artists: json.artists})
        })
        .catch(error => {
          this.setState({artists: ''})
        })
    }).catch(error => {
      this.setState({artists: ''})
    });
  }

  render() {
    const {artists} = this.state;
    const artistsList = artists.length > 0
      ? artists.map((artist, index) => {
        return <li key={index} className="artists-item">
          <div className="artists-image">
            <img alt="example" width="100%" src={artist.picUrl}/>
          </div>
          <div className="artists-text">
            <Link to={`/artists/${artist.id}`}>
              <p className="artists-name">{artist.name}</p>
            </Link>
            <p className="albumSize">{`${artist.albumSize} Albums`}</p>
          </div>
        </li>
      })
      : <Loading title="正在加载..." show={this.state.loading}/>
    return (
      <div className="artists-body content-layout">
        <h2>歌手</h2>
        <ul className="artists-list">{artistsList}</ul>
      </div>
    )
  }
}

export default Artist;