import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './audioplay.scss';

class AudioPlay extends Component {
  constructor(props) {
    super(props);

    this.currentSong = {
      id: 0,
      src: '',
      picUrl: '',
      isautoplay: false
    }

     // 当前播放位置
     this.currentIndex = 0;
     // 播放模式  单曲  随机  循环
     this.Modes = ["singCircle", "random", "refresh"];

    this.state = {
      isPlay: false,
      progressWidth: '0%',
      currentTime: '00:00',
      duration: '00:00',
      currentMode: 2
    }
  }

  componentDidUpdate() {
    // 点击页面立即播放
    if (this.currentSong.isautoplay === true) {
      this.audioDOM.play()
      // 拿到当前播放歌曲在播放列表的index
      this.currentIndex = this.props.currentSongList[0].indexOf(this.props.currentSong)
      this.currentSong.isautoplay = false
      this.setState({
        isPlay: true
      })

      // 记录播放状态到全局 =》 添加样式
      this.props.setShowSong(true)
    }
  }

  controlPlay = () => {
    if(this.audioDOM.src !== '') {
      if (this.audioDOM.paused) {
        this.audioDOM.play()
        this.setState({isPlay: true})
        this.props.setShowSong(true)
      } else {
        this.audioDOM.pause()
        this.setState({isPlay: false})
        this.props.setShowSong(false)
      }
    }
  }

  controlEnd = () => {
    if (this.props.currentSongList[0].length > 1) {
      let currentIndex = this.currentIndex
      if (this.state.currentMode === 2) {
        if (currentIndex === this.props.currentSongList[0].length - 1) {
          currentIndex = 0
        } else {
          currentIndex = currentIndex + 1
        }
      } else if (this.state.currentMode === 0) {
        this.audioDOM.play()
        return
      } else {
        currentIndex = parseInt(Math.random() * this.props.currentSongList[0].length, 10)
      }
      this.props.changeCurrentSong(this.props.currentSongList[0][currentIndex])
      this.props.changeIndex(currentIndex);
    } else {
      this.audioDOM.play()
    }
  }

  controlTime = () => {
    const duration = this.props.currentSong.dt || this.audioDOM.duration
    const time = (this.audioDOM.currentTime * 1000) / duration
    // console.log(duration)
    // console.log(this.FortmatTime(this.audioDOM.duration / 1000))
    this.setState({
      progressWidth: `${time * 100}%`,
      currentTime: this.FortmatTime(this.audioDOM.currentTime),
      duration: this.FortmatTime(duration / 1000)
    })
    this.props.setCurrentTime(this.audioDOM.currentTime)
  }

  controlProgress = (e) => {
    const left = this.progressBar.getBoundingClientRect().left
    const distance =  e.clientX - left
    const proportion = distance / this.progressBar.clientWidth
    const duration = this.audioDOM.duration
    const progress = proportion * duration
    this.audioDOM.currentTime = progress
    this.setState({
      progressWidth: `${duration * 100}%`
    })
    this.props.setCurrentTime(this.audioDOM.currentTime)
  }

  // 下一曲
  next = () => {
    if (this.props.currentSongList[0] !== undefined && this.props.currentSongList[0].length > 0 && this.props.currentSongList[0].length !== 1) {
      let currentIndex = this.currentIndex;
      if (this.state.currentMode === 2) {
        //列表循环
        if (currentIndex === this.props.currentSongList[0].length - 1) {
          currentIndex = 0
        } else {
          currentIndex = currentIndex + 1
        }
      } else if (this.state.currentMode === 0) {
        //单曲循环
        currentIndex = this.currentIndex
      } else {
        let randomIndex = parseInt(Math.random() * this.props.currentSongList[0].length, 10);
        currentIndex = randomIndex;
      }
      this.props.changeCurrentSong(this.props.currentSongList[0][currentIndex]);
      this.props.changeIndex(currentIndex);
    }
  }

  //上一曲
  previous = () => {
    if (this.props.currentSongList[0] !== undefined && this.props.currentSongList[0].length > 0 && this.props.currentSongList[0].length !== 1) {
      let currentIndex = this.currentIndex;
      if (this.state.currentMode === 2) {
        //列表循环
        if (currentIndex === 0) {
          currentIndex = this.props.currentSongList[0].length - 1
        } else {
          currentIndex = currentIndex - 1
        }
      } else if (this.state.currentMode === 0) {
        //单曲循环
        currentIndex = this.currentIndex
      } else {
        currentIndex = parseInt(Math.random() * this.props.currentSongList[0].length, 10)
      }
      this.props.changeCurrentSong(this.props.currentSongList[0][currentIndex]);
      this.props.changeIndex(currentIndex);
    }
  }

  // 格式化时间
  FortmatTime = (time) => {
    let t = Math.floor(time);
    let m = Math.floor(t / 60) < 10
      ? '0' + Math.floor(t / 60)
      : Math.floor(t / 60);
    let s = (t % 60) < 10
      ? '0' + (t % 60)
      : (t % 60);
    return m + ':' + s
  }

  //显示播放列表
  showCureentList = () => {
    if (this.props.show === false) {
      this.props.showList(true)
    } else {
      this.props.showList(false)
    }
  }

  render() {
    if (this.props.currentSong.id !== undefined) {
      if (this.currentSong.id !== this.props.currentSong.id) {
        this.currentSong.id = this.props.currentSong.id
        this.currentSong.picUrl = this.props.currentSong.picUrl
        this.audioDOM.src = `http://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`
        this.currentSong.isautoplay = true;
      }
    }
    return (
      <div className="play">
        <audio ref={audio => {this.audioDOM = audio}}
          onTimeUpdate={this.controlTime}
          onEnded={this.controlEnd}
        >
          您的浏览器不支持 audio 与元素,无法播放.
        </audio>
        <div className="play-album">
        <Link to={this.props.currentSong.id !== undefined
          ? `/songs`
          : ''}>
        {
          this.props.currentSong.id !== undefined
          ? <img width="100%" src={this.currentSong.picUrl} />
          : <i className="icon icon-music"></i>
        }
        </Link>
        </div>
        <div className="play-control">
          <i className="icon icon-forward" onClick = {this.previous}></i>
          {
            this.state.isPlay 
            ? <i className="icon icon-stop" onClick = {this.controlPlay}></i>
            : <i className="icon icon-play" onClick = {this.controlPlay}></i>
          }
          <i className="icon icon-next" onClick = {this.next}></i>  
        </div>
        <div className="play-status">
          <div className="play-message">
            <span>{this.props.currentSong.name}</span>
            <span>{this.state.currentTime} / {this.state.duration}</span>
            </div>
          <div className="play-progress">
            <div className="progress" ref={el => this.progressBar = el} onClick = {this.controlProgress}>
              <div className="progress-bar" style={{width: `${this.state.progressWidth}`}}></div>
            </div>
          </div>
        </div>
        <div className="play-model">
            <i className={`icon-${this.Modes[this.state.currentMode]} icon`}></i>
            <i className="icon-music_list icon" onClick={this.showCureentList}></i>
        </div>
      </div>
    )
  }
}

export default AudioPlay
