import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserList from './userlist';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            songId: '',
            id:this.props.sid
        }
    }

    componentDidMount() {
      this.loadlists();
    }
    componentWillReceiveProps() {
        this.setState((prevState, props)=>{
            id:props.sid
            let data='list_id=' +props.sid;
            let date=[];
            var myFetchOptions = {
              method: 'POST',
              mode:'cors',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
              credentials: 'include',
              body:data
            };
              fetch("/user/song/list", myFetchOptions)
                  .then(response => {
                      if (response.status !== 200) {
                          throw new Error('未请求成功，状态码为' + response.status)
                      }
                      response.json().then(json => json.result.map(item => {
                        let newItem = {};
                        newItem.Id=item.id
                        newItem.id = item.song_id
                        newItem.name = unescape(item.song_name)
                        newItem.alId = item.al_id
                        newItem.alName = unescape(item.al_name)
                        newItem.dt = item.dt
                        newItem.picUrl = item.picUrl
                        newItem.artId = item.art_id
                        newItem.artName = unescape(item.art_name)
                        date.push(newItem)
                        return this.setState({
                            result: [date]
                        })
                    })
                ).catch(error => {
                          this.setState({
                              result: ''
                          })
                      })
                  }).catch(error => {
                  this.setState({
                      result: ''
                  })
              });
        })
    }

    loadlists() {
      let data='list_id=' +this.state.id;
      let date=[];
      var myFetchOptions = {
        method: 'POST',
        mode:'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          },
        credentials: 'include',
        body:data
      };
        fetch("/user/song/list", myFetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
                }
                response.json().then(json => json.result.map(item => {
                  let newItem = {};
                  newItem.Id=item.id
                  newItem.id = item.song_id
                  newItem.name = unescape(item.song_name)
                  newItem.alId = item.al_id
                  newItem.alName = unescape(item.al_name)
                  newItem.dt = item.dt
                  newItem.picUrl = item.picUrl
                  newItem.artId = item.art_id
                  newItem.artName = unescape(item.art_name)
                  date.push(newItem)
                  return this.setState({
                      result: [date]
                  })
              })
          ).catch(error => {
                    this.setState({
                        result: ''
                    })
                })
            }).catch(error => {
            this.setState({
                result: ''
            })
        });
    }

    timeDt(time) {
        let t = Math.floor(time / 1000);
        let m = Math.floor(t / 60) < 10 ? '0' + Math.floor(t / 60) : Math.floor(t / 60);
        let s = (t % 60) < 10 ? '0' + (t % 60) : (t % 60);
        return m + ':' + s
    }

    selectSong(song, songs) {
        return (e) => {
            this.props.changeCurrentSong(song);
            this.props.setSongs([songs]);
            // console.log(song)
            // console.log([songs])
        };
    }

    playAll = () => {
        if (this.state.result.length > 0) {
            this.props.changeCurrentSong(this.state.result[0][0]);
            this.props.setSongs(this.state.result);
        }
    }

    deletSong =(id,e) => {
        var myFetchOptions = {
            method: 'PATCH',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
                },
            credentials: 'include'
        };
        fetch('/user/song/del'+id,myFetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
                }
                this.loadlists();
            })
    }


    render() {
        const {result} = this.state;
        const songslist = result.length>0 ?
            result[0].map((songs, index) => {
                return <li key={index} style={this.props.currentSong.id === songs.id ? {color: "#6666ff"} : {}}
                >
       <span className="song-number">{
           index < 9 ? `0${index + 1}` : index + 1
       } </span>
                    <span className="song-name">
              {songs.name}
          </span>
                    <a onClick={this.selectSong(songs, result[0])}><i className="icon-play"></i></a>
                    <span className="song-art-name">
            <Link to={`/artists/${songs.artId}`}>
              {
                  songs.artName
              }
            </Link>
          </span>
                    <span className="song-al-name song-art-name">
                        <Link to={`/albums/${songs.alId}`}>
                            {songs.alName}
                        </Link>
                    </span>
                    <span className="song-dt">{this.timeDt(songs.dt)}</span>
                    <span><i className="icon-delete createlist-dele" onClick={this.deletSong.bind(this,songs.Id)}></i></span>
                </li>
            }) : '你还没有添加歌曲哦~';
        return (
            <div className="list">
            <div className="song-list">
                <ul className="songlist">
                    <li><a className="bk-play-control" onClick={this.playAll}><i className="icon-play"></i>播放全部</a>
                    </li>
                    <li>
                        <span className="song-name title">歌曲</span>
                        <span className="song-art-name title">歌手</span>
                        <span className="song-al-name title">专辑名</span>
                        <span className="song-dt title">时长</span>
                        <span className="song-control title">操作</span>
                    </li>
                    {songslist}
                </ul>
            </div>
        </div>
        )
    }
}

export default List;