import React, {Component} from 'react';
import Play from '../../containers/Player';
// import AudioPlay from '../../components/Play/audioplay'
import List from '../../containers/CurrenList';
import './currentplay.scss';

class CurrentPlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      currentSongIndex: 0
    }
  }

  showList = (status) => {
    this.setState({show: status})
  }

  changeIndex = (index) => {
    this.setState({currentSongIndex: index});
  }

  render() {
    // console.log(this.state.currentSongIndex)
    return (
      <div className="music-curren-play">
        {/* <Play
          currentIndex={this.state.currentSongIndex}
          changeIndex={this.changeIndex}
          showList={this.showList}
          show={this.state.show}/> */}
        <Play 
          currentIndex={this.state.currentSongIndex}
          changeIndex={this.changeIndex}
          showList={this.showList}
          show={this.state.show}/>
        <List
          currentIndex={this.state.currentSongIndex}
          changeIndex={this.changeIndex}
          showList={this.showList}
          show={this.state.show}/>
      </div>
    )
  }
}

export default CurrentPlay;