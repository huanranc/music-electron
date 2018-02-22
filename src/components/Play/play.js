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
      src:'',
      isautoplay:false
    }
    //当前播放位置
    this.currentIndex=0
    //播放模式  单曲  随机  循环
    this.Modes=["singCircle","random","listCycle"]

    this.state = {
      isPlay: false,
      currentTime: 0,
      duration: 0,
      progress: 0,
      currentMode: 2,
      songs:''
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

  //切换播放模式的按钮
  changeModes=()=>{
    if(this.state.currentMode<2){
      this.setState({currentMode:this.state.currentMode+1});
    }else{
      this.setState({currentMode:0});
    }
    // console.log(this.state.currentMode)
  }

//下一曲
next=()=>{
  console.log(this.props.currentSongList[0].length)
  if(this.props.currentSongList[0].length>0&&this.props.currentSongList[0].length!==1) {
    let currentIndex=this.currentIndex
      if(this.state.currentMode === 2) {
        //列表循环
         if(currentIndex===this.props.currentSongList[0].length-1) {
           currentIndex=0
         }else {
          currentIndex=currentIndex+1
         }
       }else if(this.state.currentMode===0) {
       //单曲循环
         currentIndex=this.currentIndex
       }else {
         let randomIndex=parseInt(Math.random()*this.props.currentSongList[0].length,10)
         currentIndex=randomIndex
         console.log(randomIndex)
       }
  //  console.log(currentIndex)
  //  console.log(this.props.currentSongList[0][currentIndex])
   this.props.changeCurrentSong(this.props.currentSongList[0][currentIndex])
   this.currentIndex=currentIndex
  }
}


//上一曲
previous=()=>{
   console.log(this.state.currentMode)
   if(this.props.currentSongList[0].length>0&&this.props.currentSongList[0].length!==1) {
     let currentIndex=this.currentIndex
       if(this.state.currentMode === 2) {
         //列表循环
          if(currentIndex===0) {
            currentIndex=this.props.currentSongList[0].length-1
          }else {
            currentIndex=currentIndex-1
          }
        }else if(this.state.currentMode===0) {
        //单曲循环
          currentIndex=this.currentIndex
        }else {
          let randomIndex=parseInt(Math.random()*this.props.currentSongList[0].length,10)
          currentIndex=randomIndex
        }
    this.props.changeCurrentSong(this.props.currentSongList[0][currentIndex])
    this.currentIndex=currentIndex
   }
}

controlAllAudio=()=>{
  this.setState({
    //获得音乐总秒数
    duration: this.audioDOM.duration
  })
}

controlAudio=()=> {
    this.setState({
      //获得当前音乐播放的秒数
      currentTime: this.audioDOM.currentTime,
      progress: this.state.currentTime / this.state.duration * 100
    });
}

controlEnd=()=>{
  if(this.props.currentSongList[0].length>1) {
    let currentIndex=this.currentIndex
      if(this.state.currentMode === 2) {
        //列表循环
         if(currentIndex===this.props.currentSongList[0].length-1) {
           currentIndex=0
         }else {
           currentIndex=currentIndex+1
         }
       }else if(this.state.currentMode===0) {
       //单曲循环
        this.audioDOM.play()
        return
       }else {
         let randomIndex=parseInt(Math.random()*this.props.currentSongList[0].length,10)
         currentIndex=randomIndex
       }
   this.props.changeCurrentSong(this.props.currentSongList[0][currentIndex])
   this.currentIndex=currentIndex
  }else {
    //不断播放
       this.audioDOM.play()
  }
}

//显示播放列表
showCureentList=()=>{
  if(this.props.show===false){
    this.props.showList(true)
  }else{
    this.props.showList(false)
  }
}

//转换成分钟和秒
changeTime(time) {
  // let durationTime=parseInt(time);
  // let minute = parseInt(durationTime/60);
  // let second = durationTime%60+'';
  // let symbol = ':';
  // if(minute == 0){
  //   minute = '00';
  // }else if(minute < 10 ){
  //   minute = '0'+minute;
  // }
  // if(second.length == 1){
  //   second = '0'+second;
  // }
  // return minute+symbol+second
  let t=Math.floor(time);
  let m=Math.floor(t/60)<10?'0'+Math.floor(t/60):Math.floor(t/60);
  let s=(t%60)<10?'0'+(t%60):(t%60);
  return m+':'+s
}

  render() {
    var myFetchOptions = {

      method: 'GET'

    };
    fetch(`/song/detail?ids=${this.props.currentSong.id}`, myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({songs: json.songs}));
    //点击播放。同时收入当前播放列表
    // console.log(this.props.currentSong);
    // console.log(this.props.currentSongList);
    if(this.props.currentSong.id!==undefined){
      if(this.currentSong.id!==this.props.currentSong.id){
        this.currentSong.id=this.props.currentSong.id;
        this.audioDOM.src=`http://music.163.com/song/media/outer/url?id=${this.props.currentSong.id}.mp3`;
        this.currentSong.isautoplay=true;
      }
    }
    const {songs} = this.state; 
    return (
      <div className="play">
        <Link className = "singer-icon" to = {
          songs.length > 0
            ? `/songs/${songs[0].id}`
            : 'no'
        } > {

          songs.length > 0
            ? <img width="100%" src={songs[0].al.picUrl}/>
            : <i className="icon-text icon-artist"></i>

        }
        </Link>
        <div className="play-control">
          <a  onClick={this.previous }href="javascript:void(0)" className="prev-btn"><span className="icon-text icon-back "></span></a>
           {
          this.state.isPlay ?
          <a onClick={this.playState} href="javascript:void(0)" className="stop-btn"><span className="icon-text icon-stop"></span></a>
          :
          <a onClick={this.playState} href="javascript:void(0)" className="play-btn"><span className="icon-text icon-play"></span></a>
          }
          <a onClick={this.next} href="javascript:void(0)" className="next-btn"><span className="icon-text icon-forward"></span></a>
        </div>
        <div className="progress-song">
          <span className="song-txt">{songs.length > 0?songs[0].name:''}</span>
          <Progress  progress={this.state.progress}/>
        </div>
        <span style={{ fontSize: 12, color: '#fff' }} className="play-text">{this.changeTime(this.state.currentTime)+' / '+this.changeTime(this.state.duration)}</span>
        <div className="play-control">
          <a href="javascript:void(0)" onClick={this.changeModes}><span className={`icon-${this.Modes[this.state.currentMode]} icon-text`}></span></a>
          <a href="javascript:void(0)" onClick={this.showCureentList}><span className="icon-list icon-text"></span></a>
        </div>
        <audio preload="true" onCanPlay={ this.controlAllAudio} onTimeUpdate={ this.controlAudio} onEnded={this.controlEnd} ref={(audio) => { this.audioDOM = audio; }}>
          您的浏览器不支持 audio 与元素。
        </audio>
      </div>
    );
  }
}

export default Play;