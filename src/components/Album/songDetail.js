import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import Loading from '../../commpon/Loading/loading';
import './songlist.scss';

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state={
      songsAblum:[],
      loading: true,
      show:false
      }
  }
  componentDidMount() {
    const date=[]
    var myFetchOptions ={
      method:'GET'
    };
    fetch("/album?id="+this.props.id ,myFetchOptions)
    .then(response => {
      if(response.status!==200){
        throw new Error('未请求成功，状态码为'+response.status)
      }
      response.json().then(json => {
        let newItem = {};
            newItem.alId = json.album.id
            newItem.alName = json.album.name
            newItem.tags=[json.album.subType]
            newItem.description = json.album.description
            newItem.picUrl = json.album.picUrl
            newItem.artId=json.album.artist.id
            newItem.artName=json.album.artist.name
            newItem.createTime=json.album.publishTime
            date.push(newItem)
        return   this.setState({
              songsAblum:[date],
              loading: false
              })
      }
    ).catch(error=>{this.setState({songsAblum:''})})
  }).catch(error=>{this.setState({songsAblum:''})});
  }

  timeCreate(time) {
    let unix=time
    let unixTime=new Date(unix)
    let y=unixTime.getFullYear()
    let m=(unixTime.getMonth()+1)>10?(unixTime.getMonth()+1):'0'+(unixTime.getMonth()+1)
    let d=unixTime.getDate()>10?unixTime.getDate():'0'+unixTime.getDate()
    return y+'-'+m+'-'+d
  }

  loading=()=>{
    if(this.state.show === false) {
      this.loadStyle= {
        overflow:"visible",
        height:"auto"
      }
      this.setState({
        show:true
      })
    } else {
      this.loadStyle={
        height: "3.125rem",
        overflow: "hidden"
      }
      this.setState({
        show:false
      })
    }
    // console.log(this.state.show)
  }

  render() {
    const {songsAblum} = this.state;
    const songs=songsAblum.length ?
    songsAblum[0].map((song,index) => {
       return <div className="bk-info" key={index}>
                  <img className="bk-pic" alt="专辑图片" src={song.picUrl} />
                  <div className="bk-name">
                      <h2 className="bk-infr-name">{song.alName}</h2>
                      <p className="bk-intr">
                        <span className="intr-art-name">
                          歌手：<Link to={`/artists/${song.artId}`}>{song.artName}</Link>
                        </span>
                        <span className="intr-create-time">
                          发行时间：{this.timeCreate((song.createTime))}
                        </span>
                      </p>
                      <div className="intr-control">
                        <a className="bk-collect">收藏</a>
                      </div>
                      {song.description!==null?
                      <div className="intr-desc">
                        <span>专辑介绍：</span>
                        <p style={this.loadStyle}>{song.description}</p>
                        {song.description!==null&&song.description.length>83?
                          <a className="load" onClick={this.loading}>
                            {this.state.show===false?"显示更多":"隐藏更多"}
                          </a>
                          :
                          ''
                        }
                      </div>
                      :''
                      }
                  </div>
              </div>
    }):<Loading title="正在加载..." show={this.state.loading}/>;
    return(
        <div className="bk">{songs}</div>
      )
    }
}

export default SongList;