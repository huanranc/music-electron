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
      newSong:[],
      album:[],
      artist:[],
      alias:[],
      songId:'',
      loading: true,
      }
  }
  componentDidMount() {
    var myFetchOptions ={
      method:'GET'
    };
    fetch("/album?id="+this.props.match.params.id ,myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({
        newSong:json.songs,
        album:json.album,
        artist:json.album.artist,
        alias:json.album.alias,
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

  selectSong(song) {
		return (e) => {
      console.log([song]);
      this.props.setSongs(song);
		};
	}

  render() {
    const list =this.props.match.params.id;
    const {newSong,alias,album,artist} = this.state;
    const songslist=newSong.length ?
    newSong.map((songs,index) => {
       return <li key={songs.id} onClick={this.selectSong(songs)}>
       <span className="song-number">{
        index<9?`0${index+1}`:index+1
      } </span>

          <span className="song-name">
          {
            alias.length==0?
            <span className="song-name-txt">
            {songs.name}
            </span>:
            <span className="song-name-txt">
              {songs.name}
              <span className="alias">（{alias}）</span>
            </span>
            }
            <a onClick={this.handleSong.bind(this,this.Song(songs.id))}>play</a>
          </span>
          <span className="song-art-name">
            <Link to={`artists/${album.artist.id}`}>
              {album.artist.name}
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
            album.blurPicUrl}
          />
          <div className="ablum-title">
            <h2>{alias.length==0?album.name:`${album.name}（${alias}）`}</h2>
                <span className="artist">
                  <Link to={`/artists/${artist.id}`}>
                    {artist.name}
                  </Link>
                </span>
          
                <a className="left"><i className="icon-play"></i></a>
                <a className="play-contron">收藏</a>
             
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