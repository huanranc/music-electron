import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class NewSong extends Component {
  constructor() {
    super(...arguments);
    this.state={
      result:[]
    }
  }
  componentDidMount() {
    var myFetchOptions ={
      method:'GET'
    };
    fetch("/personalized/newsong",myFetchOptions)
    .then(response => response.json())
    .then(json => 
      this.setState({
        result:json.result
      }));
  };
  render() {
    const {result} = this.state;
    const resultList=result.length ?
    result.map((newSong,index) => {
       return <li key={index} className="newsong-list">
          <div className="newsong-body">
            <div className="newsong-image">
              <img alt="example" width="100%" src={newSong.song.album.picUrl} />
            </div>
            <div  className="newsong-text">
              <p>{newSong.name}</p>
              <p className="artists">by {newSong.song.artists[0].name}</p>
            </div>
          </div>
        </li>
    })
    :'对不起，加载失败'
    ;
    return(
      <div className="newsong">
          <ul className="newsong-content">{resultList}</ul>
      </div>
    )
   }
}

export default NewSong;