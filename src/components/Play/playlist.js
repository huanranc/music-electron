import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import { CSSTransition } from "react-transition-group"

class PlayList extends Component {
  constructor(props){
    super(props);
    this.state={
      showList:false
    }
  }

  removeSong(id,index) {
    return()=>{
      if(this.props.currentSong.id!==id){
      }
    }
  }
  render(){
    let list=this.props.currentSongList
    const playlist=list.length?list[0].map((songs,index)=>{
       return <li key={index} style={this.props.currentSong.id===songs.id?{color:"#6666ff"}:{color:"#fff"}}>
                  {songs.name}
                    <span onClick={this.removeSong(songs.id,index)} className="icon-删除"></span>
              </li>
    })
    :""
    return(
      <CSSTransition in={this.props.show} classNames="fade" timeout={500} 
					onEnter={() => {
						this.setState({showList:true});
					}}
					onExited={() => {
						this.setState({showList:false});
					}}>
      <div style={this.state.showList===true?{display:"block"}:{display:"none"}} className="list-song">
        <span className="list-song-title">播放列表</span>
        <ul>{playlist}</ul>
      </div>
      </CSSTransition>
    )
  }
}

export default PlayList;