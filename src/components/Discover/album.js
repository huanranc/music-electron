import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import './discover.scss';
class AblumDiscover extends Component {
  constructor(props){
    super(props);
    this.state={albums:[]}
  }
  componentDidMount() {
    var myFetchOptions ={
      method:'GET'
    };
    fetch("/top/album?offset=0&limit=3",myFetchOptions)
    .then(response => response.json())
    .then(json => 
      this.setState({albums:json.albums}));
  };
  render() {
    const {albums} = this.state;
    const albumsList=albums.length ?
    albums.map((newSong,index) => {
       return <li key={index} className="album-list">
       <Link to={`/albums/${newSong.id}`}>
          <div className="album-image" className={`img${index+1}`}>
            <img alt="example" width="100%" src={newSong.picUrl} />
          </div>
          </Link>
        </li>
    })
    :'对不起，加载失败'
    ;
      return (
        <div className="discover-album">
          <ul>{albumsList}</ul>
        </div>
      )
    }
}

export default AblumDiscover