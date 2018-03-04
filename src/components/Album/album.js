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
      albums:[]
    }
  }
  componentDidMount() {
    const date=[]
    if (!this.props.match.isExact) {
			this.setState({loading: false});
		}
    var myFetchOptions ={
      method:'GET'
    };
    fetch("/top/album?offset=0&limit=52",myFetchOptions)
    .then(response => {
      if(response.status!==200){
        throw new Error('未请求成功，状态码为'+response.status)
      }
      response.json().then(json => json.albums.map(item=>{
      let newItem={}
          newItem.id=item.id
          newItem.name=item.name
          newItem.artName=item.artist.name
          newItem.picUrl=item.picUrl
          newItem.size=item.size
          date.push(newItem)
      return this.setState({
        albums:[date],
        loading:false
          })
        })
      ).catch(error=>{this.setState({albums:''})})
    }).catch(error=>{this.setState({albums:''})});
  }

  render() {
    const {albums} = this.state;
    const songList=albums.length ?
    albums[0].map((newSong,index) => {
       return <li key={index} className="ablum-list">
       <Link to={`/albums/${newSong.id}`}>
          <div className="card">
            <div className="card-image">
              <LazyLoad height={179}>
                <img title={newSong.name} alt="example" width="100%"  height="100%" src={newSong.picUrl} />
              </LazyLoad>
            </div>
            <div  className="card-body">
              <h3>{newSong.name}</h3>
              <p>{newSong.artName}</p>
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
          <h2>新碟上架</h2>
          <ul className="card-row">
          {songList}
          </ul>
        </div>
      )
    }
}

export default Ablum;