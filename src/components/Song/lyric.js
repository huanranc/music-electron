import React, { Component } from 'react';
import {
  NavLink
} from 'react-router-dom';
import Loading from '../../commpon/Loading/loading';
import index from 'react-lazyload';

class Lyric extends Component {
  constructor(props) {
    super(props);
    this.state={
      lrc:'',
      loading: true,
      }
  }
  componentDidMount() {
    var myFetchOptions ={
      method:'GET'
    };
    fetch("/lyric?id="+this.props.id ,myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({
        lrc:json.lrc,
        loading: false
      })}
  );
  }
  render(){
    const {lrc} = this.state;
    let lyric=lrc.lyric
    console.log(this.props.id)
    let lyrics=lyric!==undefined?lyric.split(/[\n\r]/).map((line, i) => {
      let match = line.match(/^\[\d*:\d*\.\d*]/);
    return line.replace(/^\[.*?\]/, '')
      })
    :''
    return(
      <div className="lyc">
        <ul className="lyc-list">
							{lyric!==undefined?lyrics.map((line, i) => <li key={`${i}`}>
					            {line}
					        </li>):''}
						</ul>
      </div>
    )
  }
}

export default Lyric;