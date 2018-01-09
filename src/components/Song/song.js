import React, { Component } from 'react';
import {
  NavLink
} from 'react-router-dom';
import Lyric from './lyric';
import Loading from '../../commpon/Loading/loading';
import index from 'react-lazyload';

class Song extends Component {
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
    fetch("/song/detail?ids="+this.props.match.params.id,myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({
        lrc:json.lrc,
        loading: false
      })}
  );
  }
  render(){
    return(
      <div className="sing">
        <Lyric id={this.props.match.params.id}/>
      </div>
    )
  }
}

export default Song;