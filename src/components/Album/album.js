import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import './album.scss';
import Loading from '../../commpon/Loading/loading';
import LazyLoad from "react-lazyload";
class Ablum extends Component {
  constructor() {
    super(...arguments);
    this.state={
      loading: true,
      songs:[]
    }
  }
  componentDidMount() {
    if (!this.props.match.isExact) {
			this.setState({loading: false});
		}
    var myFetchOptions ={
      method:'GET'
    };
    fetch("/top/album?offset=0&limit=32",myFetchOptions)
    .then(response => response.json())
    .then(json => 
      this.setState({
        songs:json.albums,
        loading: false
      }));
  };

  render() {
    const {songs} = this.state;
    const songList=songs.length ?
    songs.map((newSong,index) => {
       return <li key={index} className="ablum-list">
       <Link to={`/albums/${newSong.id}`}>
          <div className="card">
            <div className="card-image">
              <LazyLoad>
                <img title={newSong.name} alt="example" width="100%"  height="100%" src={newSong.picUrl} />
              </LazyLoad>
            </div>
            <div  className="card-body">
              <h3>{newSong.name}</h3>
              <p>{newSong.artist.name}</p>
              <p>{newSong.size} song</p>
            </div>
          </div>
          </Link>
        </li>
    })
    :<Loading title="正在加载..." show={this.state.loading}/>
    ;
      return (
        <div className="content-layout">
          <h2>The new disc shelves</h2>
          <ul className="card-row">
          {songList}
          </ul>
        </div>
      )
    }
}

export default Ablum;