import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import './playlist.scss';
import Loading from '../../commpon/Loading/loading';
import LazyLoad from "react-lazyload";
class PlayList extends Component {
  constructor() {
    super(...arguments);
    this.state={
      loading: true,
      result:[]
    }
  }
  componentDidMount() {
    if (!this.props.match.isExact) {
			this.setState({loading: false});
		}
    var myFetchOptions ={
      method:'GET'
    };
    fetch("/personalized?offset=0&limit=32",myFetchOptions)
    .then(response => response.json())
    .then(json => 
      this.setState({
        result:json.result,
        loading: false
      }));
  };

  render() {
    const {result} = this.state;
    const resultList=result.length ?
    result.map((newSong,index) => {
       return <li key={index} className="ablum-list">
       <Link to={`/playlists/${newSong.id}`}>
          <div className="card">
            <div className="card-image">
              <LazyLoad>
                <img alt="example" width="100%" height="100%" src={newSong.picUrl} />
              </LazyLoad>
            </div>
            <div  className="card-body">
              <p>{newSong.name}</p>
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
          {resultList}
          </ul>
        </div>
      )
    }
}

export default PlayList;