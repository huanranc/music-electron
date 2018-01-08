import React, { Component } from 'react';
import './play.scss';

class Play extends Component {
  render(){
    console.log(this.props.currentSong);
    console.log(this.props.playSongs);
    return(
      <div className="play">
        <audio id="audio" preload="true"  src='http://music.163.com/song/media/outer/url?id=526434593.mp3' onTimeUpdate={ this.controlAudio}  ref="audioplay">
          您的浏览器不支持 audio 与元素。
        </audio>
      </div>
    );
  }
}

export default Play;