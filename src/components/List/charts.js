import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import '../../commpon/icon/font.css';
class Charts extends Component {
  constructor() {
    super(...arguments);
    this.state={
      result:[],
      show: 'none'
    }
  }
  componentDidMount() {
    var myFetchOptions ={
      method:'GET'
    };
    fetch("/personalized?offset=0&limit=8",myFetchOptions)
    .then(response => response.json())
    .then(json => 
      this.setState({result:json.result}));
  };
  render() {
    const {result} = this.state;
    const resultList=result.length ?
    result.map((newSong,index) => {
       return <li key={index} className="play-list">
       <Link to={`/playlists/${newSong.id}`}>
          <div className="card">
            <div className="card-image image">
              <img alt="example" width="100%" src={newSong.picUrl} />
            </div>
            <div  className="card-body">
              <p>{newSong.name}</p>
            </div>
          </div>
          </Link>
        </li>
    })
    :'对不起，加载失败'
    ;
    return(
      <div className="recommend">
        <ul className="card-row">{resultList}</ul>
      </div>
    )
   }
}

export default Charts