import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import './lyric.scss'

class Lyric extends Component {
  constructor(props) {
    super(props);
     //当前播放
     this.currentSong={
      id: 0
    }
    this.state={
      lrc:''
      }
  }
  render(){
    if(this.props.currentSong.id!==undefined){
      if(this.currentSong.id!==this.props.currentSong.id){
        this.currentSong.id=this.props.currentSong.id;
        var myFetchOptions ={
          method:'GET'
        };
        fetch("/lyric?id="+this.props.currentSong.id ,myFetchOptions)
        .then(response => response.json())
        .then(json => {
          this.setState({
            lrc:json.lrc
          })}
        );
      }
}
    const {lrc} = this.state;
    let lyric= lrc===undefined?'纯音乐':lyric=lrc.lyric
    const seconds=this.props.currentTime
    console.log(this.props.currentTime)
    const secondsFormat = seconds => {
      let min = Math.floor(seconds / 60)
      let sec = seconds % 60 + 100
      return ('0' + min).slice(-2) + ':' + sec.toFixed(2).substring(1)
    }
    // console.log(secondsFormat(seconds))
    let currentTime = secondsFormat(seconds + 1)
    let index = 0
    let lyrics=lyric!==undefined?lyric.split(/[\n\r]/).map((line, i) => {
      let match
      match = line.match(/^\[(\d\d:\d\d\.\d\d)\]/) || line.match(/^\[(\d\d:\d\d\.\d\d\d)\]/)
      if (match) {
        if (match[1] < currentTime) {
            index = i
        }
    }
    return line.replace(/^\[.*?\]/, '')
      })
    :''
    return <div className="singles-page">
            <div className="disk">
              <div className={"disk-inner" + (this.props.showSong ? " playing" : "")}>
                <img className="disk-img" alt="专辑图片"  src={this.props.currentSong!==undefined?this.props.currentSong.picUrl:''}/>
                <span className="msk"></span>
              </div>
            </div>
            <div className="lyrics">
              <h3 className="lyrics-name">{this.props.currentSong.name}</h3>
              <p className="lyrics-des">歌手：<Link to={`/artists/${this.props.currentSong.artId}`}>{this.props.currentSong.artName}</Link></p>
              <p className="lyrics-des">专辑：<Link to={`/albums/${this.props.currentSong.alId}`}>{this.props.currentSong.alName}</Link></p>
              <div className="lyrics-inner">
                <ul className="lyrics-list" style={index===0?{}:{ transform: `translateY(${-42 * (index - 4)}px)`}}>
                  {lyric!==undefined?lyrics.map((line, i) => 
                    <li key={`${i}`} style={index === i ? { color: '#6666ff' } : {}}>
                      {line}
                    </li>):<li>歌词加载中...</li>}
                </ul>
              </div>
            </div>
    </div>
  }
}

export default Lyric;