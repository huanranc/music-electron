import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TabControl from '../Tabs/tabControl';
import './search.scss'


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: [],
            resultPlayList: [],
            resultArtists: [],
            resultAlbums: [],
            loading: true
        }
    }

    search = () => {
        const date = [];
        const playlists = [];
        const artists = [];
        const albums = [];
        var myFetchOptions = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        };
        fetch(`/search?keywords=${this.refs.input.value}`, myFetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
                }
                response.json().then(json => json.result.songs.map(item => {
                        let newItem = {}
                        newItem.id = item.id
                        newItem.name = item.name
                        newItem.dt = item.duration
                        newItem.alId = item.album.id
                        newItem.alName = item.album.name
                        newItem.artName = item.artists[0].name
                        newItem.artId = item.artists[0].id
                        newItem.picUrl=item.artists[0].img1v1Url
                        date.push(newItem)
                        return this.setState({
                            result: [date],
                            loading: false
                        })
                    })
                ).catch(error => {
                    this.setState({result: ''})
                })
            }).catch(error => {
            this.setState({result: ''})
        });

        fetch(`/search?&type=1000&keywords=${this.refs.input.value}`, myFetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
                }
                response.json().then(json => json.result.playlists.map(item => {
                        let Item = {}
                        Item.id = item.id
                        Item.name = item.name
                        Item.picUrl = item.coverImgUrl
                        Item.nickname = item.creator.nickname
                        Item.trackCount = item.trackCount
                        Item.playCount = item.playCount
                        playlists.push(Item)
                        return this.setState({
                            resultPlayList: [playlists]
                        })
                    })
                ).catch(error => {
                    this.setState({resultPlayList: ''})
                })
            }).catch(error => {
            this.setState({resultPlayList: ''})
        });

        fetch(`/search?&type=100&keywords=${this.refs.input.value}`, myFetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
                }
                response.json().then(json => json.result.artists.map(item => {
                        let Artitem = {}
                        Artitem.artId = item.id
                        Artitem.artName = item.name
                        Artitem.artPicUrl = item.picUrl
                        Artitem.alias = item.alias
                        artists.push(Artitem)
                        return this.setState({
                            resultArtists: [artists]
                        })
                    })
                ).catch(error => {
                    this.setState({resultArtists: ''})
                })
            }).catch(error => {
            this.setState({resultArtists: ''})
        });


        fetch(`/search?&type=10&keywords=${this.refs.input.value}`, myFetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
                }
                response.json().then(json => json.result.albums.map(item => {
                        let Albitem = {}
                        Albitem.id = item.id
                        Albitem.albName = item.name
                        Albitem.artName = item.artists.name
                        Albitem.picUrl = item.picUrl
                        Albitem.alias = item.alias
                        albums.push(Albitem)
                        return this.setState({
                            resultAlbums: [albums]
                        })
                    })
                ).catch(error => {
                    this.setState({resultAlbums: ''})
                })
            }).catch(error => {
            this.setState({resultAlbums: ''})
        });
    }

    timeDt(time) {
        let t = Math.floor(time / 1000);
        let m = Math.floor(t / 60) < 10 ? '0' + Math.floor(t / 60) : Math.floor(t / 60);
        let s = (t % 60) < 10 ? '0' + (t % 60) : (t % 60);
        return m + ':' + s
    }

    enterSearch = (e) => {
        const event = e || event
        event.keyCode === 13 ? this.search() : ''
    }

    selectSong(song, songs) {
        return (e) => {
            this.props.changeCurrentSong(song);
            this.props.setSongs([songs]);
            // console.log(song)
            // console.log([songs])
        };
    }


    render() {
        const {result, resultPlayList, resultArtists, resultAlbums} = this.state;
        const resultsong = result.length !== 0 ?
            result[0].map((newSong, index) => {
                return <li key={index}>
                         <span className="song-number">{
                            index < 9 ? `0${index + 1}` : index + 1
                        } </span>
                        <span className="song-name">{newSong.name}</span>
                        <span className="ant-dropdown-link" onClick={this.selectSong(newSong, result[0])}><i className="icon-play"></i></span>
                        <span className="song-art-name">{newSong.artName}</span>
                        <span className="song-al-name">{newSong.albName}</span>
                        <span className="song-dt">{this.timeDt(newSong.dt)}</span>
                </li>
            })
            : ""
        const playlist = resultPlayList.length !== 0 ?
            resultPlayList[0].map((newSong, index) => {
                return <Link to={`/playlists/${newSong.id}`} key={index}>
                     <li>
                        <span className="song-number">{
                            index < 9 ? `0${index + 1}` : index + 1
                        } </span>
                        <span className="song-name">{newSong.name}</span>
                        <span className="song-art-name">{newSong.trackCount}</span>
                        <span className="song-al-name">{newSong.nickname}</span>
                        <span className="song-dt">{newSong.playCount}</span>
                    </li>
                </Link>
            })
            : ""
        ;
        const artist = resultArtists.length !== 0 ?
            resultArtists[0].map((song, index) => {
                return <li key={index}>
                         <span className="song-number">{
                            index < 9 ? `0${index + 1}` : index + 1
                        } </span>
                        {
                            song.alias != null && song.alias.length === 0 ?
                                <span className="song-art-name">
            {song.artName}
            </span>
                                :
                                <span className="song-art-name">
              {song.artName}
                                    <span style={{color: '#aeaeae'}}>
              （{song.alias}）
              </span>
            </span>
                        }
                   
                </li>
            })
            : ""
        ;
        const album = resultAlbums.length !== 0 ?
            resultAlbums[0].map((song, index) => {
                return <li key={index}>
                        <Link to={`/albums/${song.id}`}>
                        <span className="song-number">{
                            index < 9 ? `0${index + 1}` : index + 1
                        } </span>
                        {
                            song.alias != null && song.alias.length === 0 ?
                                <span className="song-al-name">
            {song.albName}
            </span>
                                :
                                <span className="song-al-name">
              {song.albName}
                                    <span style={{color: '#aeaeae'}}>
              （{song.alias}）
              </span>
            </span>
                        }
                        <span className="song-art-name">{song.artName}</span>
                        </Link>
                </li>
            })
            : ""
        ;
        return (
            <div className="search">
                <div className="search-input">
                    <input className="text" type="text" placeholder="搜索音乐" ref="input" onKeyDown={this.enterSearch} />
                    <button className="button" onClick={this.search}><i className="icon-search"></i></button>
                </div>
                <TabControl>
                    <div name="单曲" className="song-list search-list">
                        <ul>{resultsong}</ul>
                    </div>
                    <div name="歌手" className="song-list search-list">
                        <ul>{artist}</ul>
                    </div>
                    <div name="专辑" className="song-list search-list">
                        <ul>{album}</ul>
                    </div>
                    <div name="歌单" className="song-list search-list">
                        <ul>{playlist}</ul>
                    </div>
                </TabControl>
            </div>
        )
    }
}

export default Search;