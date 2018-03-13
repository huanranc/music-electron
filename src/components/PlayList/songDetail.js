import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../commpon/Loading/loading';
import './songlist.scss';

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: [],
            loading: true,
            show: false
        }
    }

    componentDidMount() {
        const date = []
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("/playlist/detail?id=" + this.props.id, myFetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
                }
                response.json().then(json => {
                        let newItem = {};
                        newItem.name = json.playlist.name
                        newItem.avatarUrl = json.playlist.creator.avatarUrl
                        newItem.nickname = json.playlist.creator.nickname
                        newItem.description = json.playlist.description
                        newItem.coverImgUrl = json.playlist.coverImgUrl
                        newItem.createTime = json.playlist.createTime
                        newItem.tags = json.playlist.tags
                        date.push(newItem)
                        return this.setState({
                            playlist: [date]
                        })
                    }
                ).catch(error => {
                    this.setState({playlist: ''})
                })
            }).catch(error => {
            this.setState({playlist: ''})
        });
    }

    timeCreate(time) {
        let unix = time
        let unixTime = new Date(unix)
        let y = unixTime.getFullYear()
        let m = (unixTime.getMonth() + 1) > 10 ? (unixTime.getMonth() + 1) : '0' + (unixTime.getMonth() + 1)
        let d = unixTime.getDate() > 10 ? unixTime.getDate() : '0' + unixTime.getDate()
        return y + '-' + m + '-' + d
    }

    loading = () => {
        if (this.state.show === false) {
            this.loadStyle = {
                overflow: "visible",
                height: "auto"
            }
            this.setState({
                show: true
            })
        } else {
            this.loadStyle = {
                height: "3.125rem",
                overflow: "hidden"
            }
            this.setState({
                show: false
            })
        }
        // console.log(this.state.show)
    }

    render() {
        const {playlist} = this.state;
        const songs = playlist.length ?
            playlist[0].map((song, index) => {
                return <div className="bk-info" key={index}>
                    <img className="bk-pic" alt="专辑图片" src={song.coverImgUrl} />
                    <div className="bk-name">
                        <h2 className="bk-infr-name">{song.name}</h2>
                        <div className="bk-intr">
                            <div className="intr-art-name">
                                <img className="avatarUrl" alt="头像" src={song.avatarUrl} /><Link
                                to={`/artists/`}>{song.nickname}</Link>
                            </div>
                            <div className="intr-create-time intr-playlist-create-time">
                                {this.timeCreate((song.createTime))} 创建
                            </div>
                        </div>
                        <div className="intr-control">
                            <a className="bk-collect">收藏</a>
                        </div>
                        <div className="intr-tag intr-desc">
                            <span>标签：</span>
                            <span>{song.tags.map(item => {
                                return item + ' '
                            })}</span>
                        </div>
                        {song.description !== null ?
                            <div className="intr-desc">
                                <span>介绍：</span>
                                <p style={this.loadStyle}>{song.description}</p>
                                {song.description !== null && song.description.length > 83 ?
                                    <a className="load" onClick={this.loading}>
                                        {this.state.show === false ? "显示更多" : "隐藏更多"}
                                    </a>
                                    :
                                    ''
                                }
                            </div>
                            : ''
                        }
                    </div>
                </div>
            }) : <Loading title="正在加载..." show={this.state.loading} />;
        return (
            <div className="bk">{songs}</div>
        )
    }
}

export default SongList;