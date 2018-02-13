import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Progress from './progress';
import './play.scss';

// 1.播放、暂停
// 2.上一曲、下一曲
// 3.进度条控制
// 4.列表点击可以播放
// 5.有个列表加入进去

class Play extends Component {
  constructor(props) {
    super(props);
    //当前播放
    this.currentSong={
      id: 0,
      url:'',
      isautoplay:false
    }
    //播放模式
    this.Modes=["单曲","随机","列表"]

    this.state = {
      isPlay: false,
      currentTime: 0,
      duration:0,
      progress:0,
      currentMode:0,
      }
  }

  componentDidUpdate(){
    //点击页面立即播放
    if(this.currentSong.isautoplay===true){
      this.audioDOM.play();
      this.currentSong.isautoplay=false;
      this.setState({isPlay:true});
    }
  }
      //播放或者暂停
      playState=()=>{
        if(this.audioDOM.paused){
          this.audioDOM.play();
          this.setState({isPlay:true});
        }
        else {
          this.audioDOM.pause();
          this.setState({isPlay:false});
        }
      }
      

  render() {
    //点击播放。同时收入当前播放列表
    if(this.props.currentSong){
      if(this.currentSong.id!==this.props.currentSong.id){
        this.currentSong=this.props.currentSong;
        this.currentSong.src=`http://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`;
        this.currentSong.isautoplay=true;
        console.log(this.props.currentSong);
        console.log(this.props.currentSongList);
      }
    }
 
    return (
      <div className="play">
        <div className="play-control">
          <a href="javascript:void(0)" className="prev-btn"><span className="icon-text icon-back "></span></a>
           {
          this.state.isPlay ?
          <a onClick={this.playState} href="javascript:void(0)" className="stop-btn"><span className="icon-text icon-stop"></span></a>
          :
          <a onClick={this.playState} href="javascript:void(0)" className="play-btn"><span className="icon-text icon-play"></span></a>
          }
          <a href="javascript:void(0)" className="next-btn"><span className="icon-text icon-forward"></span></a>
        </div>
        <Progress  progress={this.state.progress}/>
        <audio src={this.currentSong.src} ref={(audio) => { this.audioDOM = audio; }}>
          您的浏览器不支持 audio 与元素。
        </audio>
      </div>
    );
  }
}

export default Play;