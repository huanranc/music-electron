import React, { Component } from 'react';
import Play from '../../containers/Player';
import List from '../../containers/CurrenList';
import './currentplay.scss';

class CurrentPlay extends Component {
  constructor(props){
    super(props)
    this.state={
      show:false,
      currenSongIndex:0
    }
  }

  showList=(status)=>{
    this.setState({
      show:status
    })
  }

  render(){
    return(
      <div className="music-curren-play">
        <Play changeCurrentIndex={this.changeCurrentIndex} showList={this.showList} show={this.state.show}/>
        <List showList={this.showList} show={this.state.show}/>
      </div>
    )
  }
}

export default CurrentPlay;