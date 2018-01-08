import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import Loading from '../../commpon/Loading/loading';
import './songlist.scss';

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state={
      playlist:[],
      creator:[],
      tracks:[],
      songId:'',
      loading: true,
      }
  }
  componentDidMount() {
    var myFetchOptions ={
      method:'GET'
    };
    fetch("/playlist/detail?id="+this.props.match.params.id ,myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({
        playlist:json.playlist,
        creator:json.playlist.creator,
        tracks:json.playlist.tracks,
        loading: false
      })}
  );
  }

  timeDt(time) {
    let durationTime=parseInt(time/1000);
    let minute = parseInt(durationTime/60);
    let second = durationTime%60+'';
    let symbol = ':';
    if(minute == 0){
        minute = '00';
    }else if(minute < 10 ){
        minute = '0'+minute;
    }
    if(second.length == 1){
      second = '0'+second;
    }
    return minute+symbol+second
  }

  Song(id){
    return id;
  }

  handleSong(id,e){
    e.preventDefault();
    this.setState({
      songId:id
    })
    alert(id);
  }



  render() {
    const list =this.props.match.params.id;
    const {playlist,creator,tracks,ar} = this.state;
    const songslist=tracks.length ?
    tracks.map((songs,index) => {
      // let arlist=songs.ar.length?
      // songs.ar.map((ar,index) => {
      //   ar.name
      // }):'...'
       return <li key={index}
      >
       <span className="song-number">{
        index<9?`0${index+1}`:index+1
      } </span>
           <span className="song-name">
              {songs.name}
          </span>
          <span className="song-art-name">
            <Link to={`artists/`}>
              {
                songs.ar[0].name
              }
            </Link>
          </span>
          <span className="song-al-name">{songs.al.name}</span>
          <span className="song-dt">{this.timeDt(songs.dt)}</span>
        </li>
    }):<Loading title="正在加载..." show={this.state.loading}/>;
    return(
      <div className="new-ablum">
        <div className="ablum-theme">
          <img  className="ablum-img" alt="ablum-img" src={
            creator.avatarUrl}
          />
          <div className="ablum-title">
            <h2>00</h2>
            <p>
              <span className="artist">
                <Link to={`/artists/`}>
                 {creator.nickname}
                </Link>
              </span>
            </p>
          </div>
        </div>
        <div className="list">
        <div className="song-list">
              <ul className="songlist">
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