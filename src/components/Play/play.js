import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import './play.scss';

class Play extends Component {
  constructor(props){
    super(props);
    this.state = {
      isPlay: false,
      currentTime: 0,
      duration:0,
      progress:0,
      volume: 80 + '%',
      songs:'',
      song:[]
    }
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
    this.timeStart = this.timeStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }

  componentDidMount() {
    var myFetchOptions ={
      method:'GET'
    };
    fetch("/song/detail?ids=472361096",myFetchOptions)
    .then(response => response.json())
    .then(json => 
      this.setState({
        song:json.privileges,
        songs:json.songs
      }));
  };

  controlAudio() {
    let audio=this.refs.audioplay;
    this.setState({
      duration:audio.duration,
      currentTime:audio.currentTime,
      progress:this.state.currentTime / this.state.duration * 100 + '%'
    });
    console.log(this.state.duration)
  }

  timeStart(time) {
    let durationTime=parseInt(time);
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

  handlePlayerClick() {
    this.setState(prevState=>({
      isPlay:!prevState.isPlay,
      //duration:this.audioplay.duration
    }));
    if(!this.state.isPlay) {
      this.refs.audioplay.play();
      }else {
        this.refs.audioplay.pause();
      }
  }
  
  handleProgress(e){
    let settedProgress = (e.screenX - this.refs.propgressBar.getBoundingClientRect().left) / this.refs.propgressBar.clientWidth;
    this.onProgress&&this.onProgress(settedProgress);
  }

  render(){
    const {songs,song} = this.state;
    console.log(songs)
    song.length>0?console.log(songs[0].id):''
    return(
      <div className="play">
        <audio id="audio" preload="true" src='http://music.163.com/song/media/outer/url?id=472361096.mp3' ref="audioplay" onTimeUpdate={ this.controlAudio.bind(this)}>
          您的浏览器不支持 audio 与元素。
        </audio>
        <Link className="singer-icon" to={song.length>0?`/songs/${songs[0].id}`:'no'}>
          {
          songs.length>0?<img width="100%" src={songs[0].al.picUrl} />:<i className="icon-text icon-artist"></i>
          }
        </Link>
        <div className="play-control">
          <a href="javascript:void(0)" className="prev-btn"><span className="icon-text icon-back "></span></a>
          {
            this.state.isPlay ?
              <a className="stop-btn" onClick={this.handlePlayerClick} ><span className="icon-text icon-stop"></span></a>
              :
              <a className="play-btn" onClick={this.handlePlayerClick} ><span className="icon-text icon-play"></span></a>
          }
          <a href="javascript:void(0)" className="next-btn"><span className="icon-text icon-forward"></span></a>
        </div>
        <span style={{ fontSize: 12, color: '#fff' }}>{this.timeStart(this.state.currentTime)}</span>
        <div className="play-progress" onClick={this.handleProgress} ref="propgressBar" onClick={this.timer}>
          <div className="progress-nav" style={{ width: this.state.progress }}></div>
        </div>
        <span style={{ fontSize: 12, color: '#fff' }}>{this.timeStart(this.state.duration)}</span>
        <div className="volume-progress">

          <div className="play-progress">
            <div className="progress-nav" style={{ width: this.state.volume }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Play;