import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class Artist extends Component {
  constructor() {
    super(...arguments);
    this.state={
      artists:[]
    }
  }
  componentDidMount() {
    var myFetchOptions ={
      method:'GET'
    };
    fetch("/top/artists?offset=0&limit=10",myFetchOptions)
    .then(response => response.json())
    .then(json => 
      this.setState({
        artists:json.artists
      }));
  };
  render() {
    const {artists} = this.state;
    const artistsList=artists.length ?
    artists.map((artist,index) => {
       return <li key={index} className="artist-list">
            <div className="artist-image">
              <div  className="show">
                <p>{artist.name}</p>
                <p className="albumSize">{`Release ${artist.albumSize} Albums`}</p>
              </div>
              <img alt="example" width="100%" src={artist.picUrl} />
          </div>
        </li>
    })
    :'对不起，加载失败'
    ;
    return(
        <ul className="artist-content">{artistsList}</ul>
    )
   }
}

export default Artist;