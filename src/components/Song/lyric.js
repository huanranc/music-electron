import React, { Component } from 'react';
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
  componentDidMount(){
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
  }
  render(){
    const {lrc} = this.state;
    let lyric=lrc.lyric
    const seconds=this.props.currentTime
    const secondsFormat = seconds => {
      let min = Math.floor(seconds / 60)
      let sec = seconds % 60 + 100
      return ('0' + min).slice(-2) + ':' + sec.toFixed(2).substring(1)
    }
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
    return(
      <div className="lyc">
        <div className="lyc-main">
        <ul className="lyc-list" style={{ transform: `translateY(${-42 * (index - 4)}px)`}}>
              {lyric!==undefined?lyrics.map((line, i) => <li key={`${i}`} style={index === i ? { color: 'red',fontSize:'15px' } : {}}>
					            {line}
					        </li>):''}
						</ul>
          </div>
      </div>
    )
  }
}

export default Lyric;