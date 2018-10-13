import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TabControl from '../Tabs/tabControl';
import './artistDetail.scss';

class artistDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsong: [],
      resultAlbum: [],
      artist: [],
      loading: true,
      show: false
    }
  }

  componentDidMount() {
    const date = [];
    const data = [];
    const artists = [];
    var myFetchOptions = {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    };
    fetch("/artist/song?id=" + this.props.match.params.id, myFetchOptions).then(response => {
      if (response.status !== 200) {
        throw new Error('未请求成功，状态码为' + response.status)
      }
      response
        .json()
        .then(json => {
          let newItem = {};
          newItem.name = json.artist.name
          newItem.briefDesc = json.artist.briefDesc
          newItem.albumSize = json.artist.albumSize
          newItem.alias = json.artist.alias
          newItem.musicSize = json.artist.musicSize
          newItem.picUrl = json.artist.picUrl
          artists.push(newItem)
          return this.setState({artist: [artists]})
        })
        .catch(error => {
          this.setState({resultsong: ''})
        })
    }).catch(error => {
      this.setState({resultsong: ''})
    });
    fetch("/artist/song?id=" + this.props.match.params.id, myFetchOptions).then(response => {
      if (response.status !== 200) {
        throw new Error('未请求成功，状态码为' + response.status)
      }
      response
        .json()
        .then(json => json.hotSongs.map(item => {
          let newItem = {};
          newItem.id = item.id
          newItem.name = item.name
          newItem.alia = item.alia
          newItem.artId = item.ar[0].id
          newItem.artName = item.ar[0].name
          newItem.alId = item.al.id
          newItem.alName = item.al.name
          newItem.dt = item.dt
          newItem.picUrl = item.al.picUrl
          date.push(newItem)
          return this.setState({resultsong: [date]})
        }))
        .catch(error => {
          this.setState({resultsong: ''})
        })
    }).catch(error => {
      this.setState({resultsong: ''})
    });

    fetch("/artist/album?id=" + this.props.match.params.id, myFetchOptions).then(response => {
      if (response.status !== 200) {
        throw new Error('未请求成功，状态码为' + response.status)
      }
      response
        .json()
        .then(json => json.hotAlbums.map(item => {
          let newItem = {};
          newItem.id = item.id
          newItem.name = item.name
          newItem.publishTime = item.publishTime
          newItem.picUrl = item.picUrl
          data.push(newItem)
          return this.setState({resultAlbum: [data]})
        }))
        .catch(error => {
          this.setState({resultAlbum: ''})
        })
    }).catch(error => {
      this.setState({resultAlbum: ''})
    });
  }

  timeDt(time) {
    let t = Math.floor(time / 1000);
    let m = Math.floor(t / 60) < 10
      ? '0' + Math.floor(t / 60)
      : Math.floor(t / 60);
    let s = (t % 60) < 10
      ? '0' + (t % 60)
      : (t % 60);
    return m + ':' + s
  }

  loading = () => {
    if (this.state.show === false) {
      this.loadStyle = {
        overflow: "visible",
        height: "auto"
      }
      this.setState({show: true})
    } else {
      this.loadStyle = {
        height: "4.9rem",
        overflow: "hidden"
      }
      this.setState({show: false})
    }
  }

  selectSong(song, songs) {
    return (e) => {
      this
        .props
        .changeCurrentSong(song);
      this
        .props
        .setSongs([songs]);
    };
  }

  render() {
    const {resultsong, resultAlbum, artist} = this.state;
    const resultsonglist = resultsong.length
      ? resultsong[0].map((newSong, index) => {
        return <li
          className="song"
          key={index}
          style={this.props.currentSong.id === newSong.id
          ? {
            color: "#6666ff"
          }
          : {}}>
          <span>{index < 9
              ? `0${index + 1}`
              : index + 1
}
          </span>
          <span className="song-name">{newSong.name}</span>
          <a>
            <i className="icon-play" onClick={this.selectSong(newSong, resultsong[0])}></i>
          </a>
          <span className="song-alName">{newSong.alName}</span>
          <span className="song-dt">{this.timeDt(newSong.dt)}</span>
        </li>
      })
      : "";
    const resultAlbumlist = resultAlbum.length
      ? resultAlbum[0].map((newSong, index) => {
        return <li className="album" key={index}>
          <Link to={`/albums/${newSong.id}`}>
            <span>{newSong.name}</span>
          </Link>
        </li>
      })
      : "";
    const resulartist = artist.length > 0
      ? artist[0].map((song, index) => {
        return <div key={index} className="bk-info">
          <img alt="example" className="bk-pic" width="100%" src={song.picUrl}/>
          <div className="bk-name">
            <h2 className="bk-infr-name">{song.name}</h2>
            <div className="bk-intr">
              <span className="artist-song">单曲数：{song.musicSize}</span>
              <span className="artist-album">专辑数：{song.albumSize}</span>
            </div>
            {song.description !== null
              ? <div className="intr-desc">
                  <span>简介：</span>
                  <p style={this.loadStyle}>{song.briefDesc}</p>
                  {song.briefDesc !== null && song.briefDesc.length > 83
                    ? <a className="load" onClick={this.loading}>
                        {this.state.show === false
                          ? "显示更多"
                          : "隐藏更多"}
                      </a>
                    : ''
}
                </div>
              : ''
}
          </div>
        </div>
      })
      : "";
    return (
      <div className="artist-detail">
        <div className="bk">{resulartist}</div>
        <TabControl>
          <div name="单曲" className="search-list">
            <ul className="artist-song-list">{resultsonglist}</ul>
          </div>
          <div name="专辑" className="search-list">
            <ul>{resultAlbumlist}</ul>
          </div>
        </TabControl>
      </div>
    )
  }
}

export default artistDetail;
