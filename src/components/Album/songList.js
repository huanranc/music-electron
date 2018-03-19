import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SongDetails from './songDetail';
import Loading from '../../commpon/Loading/loading';
import { Menu, Dropdown, Icon } from 'antd';
import './songlist.scss';
import 'antd/dist/antd.css';


class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            loading: true
        }
    }

    componentDidMount() {
        const date = []
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("/album?id=" + this.props.match.params.id, myFetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
                }
                response.json().then(json => json.songs.map(item => {
                        let newItem = {};
                        newItem.id = item.id
                        newItem.name = item.name
                        newItem.alia = item.alia
                        newItem.alId = item.al.id
                        newItem.alName = item.al.name
                        newItem.dt = item.dt
                        newItem.picUrl = item.al.picUrl
                        newItem.artId = item.ar[0].id
                        newItem.artName = item.ar[0].name
                        date.push(newItem)
                        return this.setState({
                            songs: [date]
                        })
                    })
                ).catch(error => {
                    this.setState({songs: ''})
                })
            }).catch(error => {
            this.setState({songs: ''})
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
        if (this.state.songs.length > 0) {
            this.props.changeCurrentSong(this.state.songs[0][0]);
            this.props.setSongs(this.state.songs);
        }
        // console.log(this.state.songs[0][0])
    }

    collectSong(song) {
        return (e) => {
            console.log(song)
        }
    }


    render() {
        const menu = (
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
              </Menu.Item>
            </Menu>
          );
        const {songs} = this.state;
        const songslist = songs.length ?
            songs[0].map((song, index) => {
                return <li key={song.id}>
       <span className="song-number">{
           index < 9 ? `0${index + 1}` : index + 1
       } </span>

                    <span className="song-name">
          {
              song.alia.length !== 0 ?
                  <span className="song-name-txt">
              {song.name}
                      <span style={{color: '#aeaeae'}}>
              （{song.alia[0]}）
              </span>
            </span>
                  :
                  <span className="song-name-txt">
            {song.name}
            </span>
          }
                        <a onClick={this.selectSong(song, songs[0])}><i className="icon-play"></i></a>
                        <a onClick={this.collectSong(song)}><i className="icon-addMusic"></i></a>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                 Hover me <Icon type="down" />
                            </a>
                        </Dropdown>
          </span>
                    <span className="song-art-name">
            <Link to={`artists/${song.artId}`}>
              {song.artName}
            </Link>
          </span>
                    <span className="song-al-name">{song.alName}</span>
                    <span className="song-dt">{this.timeDt(song.dt)}</span>
                </li>
            }) : <Loading title="正在加载..." show={this.state.loading} />;
        return (
            <div className="new-ablum">
                <SongDetails id={this.props.match.params.id} />
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
                            </li>
                            {songslist}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SongList;