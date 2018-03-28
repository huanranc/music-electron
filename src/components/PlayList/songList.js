import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SongDetails from './songDetail';
import { Menu, Dropdown, Icon } from 'antd';
import Loading from '../../commpon/Loading/loading';
import './songlist.scss';

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            songId: '',
            loading: true,
            currenUserId:0,
            songlist:[],
            collect:''
        }
    }

    componentDidMount() {
        const date = []
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("/playlist/detail?id=" + this.props.match.params.id, myFetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
                }
                response.json().then(json => json.playlist.tracks.map(item => {
                        let newItem = {}
                        newItem.id = item.id
                        newItem.name = item.name
                        newItem.artId = item.ar[0].id
                        newItem.artName = item.ar[0].name
                        newItem.dt = item.dt
                        newItem.alId = item.al.id
                        newItem.alName = item.al.name
                        newItem.picUrl = item.al.picUrl
                        newItem.alia = item.alia
                        date.push(newItem)
                        return this.setState({
                            tracks: [date]
                        })
                    })
                ).catch(error => {
                    this.setState({tracks: ''})
                })
            }).catch(error => {
            this.setState({tracks: ''})
        });

        //先判断是否登录
        var myFetch = {
            method: 'GET',
            credentials: 'include',
            mode:'cors'
        };
        var myFetch = {
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
                    let loginShow=this.state.currenUserId
                    let data='id=' + this.state.currenUserId
                    var myFetchOptions = {
                        method: 'POST',
                        mode:'cors',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        credentials: 'include',
                        body:data
                    };
                    fetch("/user/list", myFetchOptions)
                                            .then(response => {
                                                    if (response.status !== 200) {
                                                        throw new Error('未请求成功，状态码为' + response.status)
                                                }
                                                response.json().then(json => {
                                                        this.setState({songlist:json.result})
                                                }
                                                ).catch(error => {
                                                        this.setState({userlist: '不存在'})
                                                })
                                                }).catch(error => {
                                            this.setState({songlist: '请求失败'})
                                });
                })
            })
    }

    // timeDt(time) {
    //   let durationTime=parseInt(time/1000);
    //   let minute = parseInt(durationTime/60);
    //   let second = durationTime%60+'';
    //   let symbol = ':';
    //   if(minute == 0){
    //       minute = '00';
    //   }else if(minute < 10 ){
    //       minute = '0'+minute;
    //   }
    //   if(second.length == 1){
    //     second = '0'+second;
    //   }
    //   return minute+symbol+second
    // }

    timeDt(time) {
        let t = Math.floor(time / 1000);
        let m = Math.floor(t / 60) < 10 ? '0' + Math.floor(t / 60) : Math.floor(t / 60);
        let s = (t % 60) < 10 ? '0' + (t % 60) : (t % 60);
        return m + ':' + s
    }

    // Song(id){
    //   return id;
    // }

    // handleSong(id,e){
    //   e.preventDefault();
    //   this.setState({
    //     songId:id
    //   })
    //   alert(id);
    // }

    selectSong(song, songs) {
        return (e) => {
            this.props.changeCurrentSong(song);
            this.props.setSongs([songs]);
        };
    }

    playAll = () => {
        if (this.state.tracks.length > 0) {
            this.props.changeCurrentSong(this.state.tracks[0][0]);
            this.props.setSongs(this.state.tracks);
        }
        // console.log(this.state.songs[0][0])
    }


        //收藏歌曲
        collectSong(id) {
            return (e) => {
                let song_id=this.state.collect.id;
                let song_name=this.state.collect.name;
                let list_id=id;
                let art_id=this.state.collect.artId;
                let art_name=this.state.collect.artName;
                let al_name=this.state.collect.alName;
                let al_id=this.state.collect.alId;
                let dt=this.state.collect.dt;
                let picUrl=this.state.collect.picUrl;
                let data ='user_id=' + this.state.currenUserId +'&song_id='+song_id +'&song_name='+song_name+'&list_id='+list_id+'&art_id='+art_id+ '&art_name='+art_name + '&al_id='+art_id +'&al_name='+art_name +'&dt='+dt+'&picUrl='+picUrl; 
                console.log(data)
                var myFetchOptions = {
                    method: 'POST',
                    mode:'cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    credentials: 'include',
                    body:data
                };
                fetch("/collection",myFetchOptions)
                        .then(response => {
                            if (response.status !== 200) {
                                throw new Error('未请求成功，状态码为' + response.status)
                            }
                            response.json().then(json => {
                                console.log(json.status)
                                if(json.status===200) {
                                    alert('收藏成功')
                                } else if(json.status===201){
                                    alert('歌曲已存在')
                                }
                            })
                        })
                    }
    
        }
        
    
        collect(song) {
            return (e) => {
               this.setState({
                   collect:song
               })
            };
        }
    


    render() {
        // const list =this.props.match.params.id;
        const {tracks,songlist} = this.state;
        const lists=this.state.songlist!==0?
        this.state.songlist.map((list,index) => {
            return  <Menu.Item key={index}>
                        <a className="ant-dropdown-link"  onClick={this.collectSong(list.id)}>{list.list_name}</a>
                    </Menu.Item>
        }):''
        const menu = (
            <Menu>
                {lists}
            </Menu>
          );
        const songslist = tracks.length ?
            tracks[0].map((songs, index) => {
                // let arlist=songs.ar.length?
                // songs.ar.map((ar,index) => {
                //   ar.name
                // }):'...'
                return <li key={index}
                >
       <span className="song-number">{
           index < 9 ? `0${index + 1}` : index + 1
       } </span>
                    <span className="song-name">
              {songs.name}
          </span>
                    <a onClick={this.selectSong(songs, tracks[0])}><i className="icon-play"></i></a>
                    <Dropdown overlay={menu} trigger={['click']}>
                            <a><i className="icon-add" onClick={this.collect(songs)}></i></a>
                        </Dropdown>
                    <span className="song-art-name">
            <Link to={`artists/`}>
              {
                  songs.artName
              }
            </Link>
          </span>
                    <span className="song-al-name">{songs.alName}</span>
                    <span className="song-dt">{this.timeDt(songs.dt)}</span>
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