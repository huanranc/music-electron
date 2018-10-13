import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../commpon/Loading/loading';
import './chart.scss';

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            loading: true
        }
    }

    componentDidMount() {
        this.soar();
    };

    soar=()=>{
        const date = [];
        let myFetchOptions = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        };
        fetch("/toplist?idx=3", myFetchOptions)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('未请求成功，状态码为' + response.status)
            }
            response.json().then(json => json.playlist.tracks.map(item => {
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
                        songs: [date],
                        loading:false
                    })
                })
            ).catch(error => {
                this.setState({songs: ''})
            })
        }).catch(error => {
        this.setState({songs: ''})
    });
    }

    selectSong(song, songs) {
        return (e) => {
            this.props.changeCurrentSong(song);
            this.props.setSongs([songs]);
        };
    }

    render() {
        const {songs} = this.state;
        const songlist=songs.length?
       songs[0].map((nsong, index) => {
                return <li key={index} className="music-list-songs" onClick={this.selectSong(nsong, songs[0])}>
                           <div className="music-list-name">
                                <img width="100%" src={nsong.picUrl}/>
                                <span>{nsong.name}</span>
                           </div>
                           <div className="music-list-artName">
                               <span>{nsong.artName}</span>
                           </div>
                           <div className="music-list-alName">
                               <span>{nsong.alName}</span>
                           </div>
                        </li>
            })
            : <Loading title="正在加载..." show={this.state.loading} />
        ;
        return (
            <div className="music-list">
                <ul>
                    <li className="music-list-title">
                        <div className="music-list-name">
                            <span>歌曲</span>
                        </div>
                        <div className="music-list-artName">
                            <span>歌手</span>
                        </div>
                        <div className="music-list-alName">
                            <span>专辑</span>
                        </div> 
                    </li>
                    {songlist}
                </ul>
            </div>
        )
    }
}

export default Charts