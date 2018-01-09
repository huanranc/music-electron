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
    console.log(lrc)
    return(
      <div className="sing">
        {lrc.lyric}
      </div>
    )
  }
}

export default Lyric;