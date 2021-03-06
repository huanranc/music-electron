import React, {Component} from 'react';
import {CSSTransition} from "react-transition-group"
import './playlist.scss'

class PlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false
    }
  }

  playSong(song, index) {
    return () => {
      this
        .props
        .changeCurrentSong(song);
      this
        .props
        .changeIndex(index);
    };
  }

  removeSong(id, index) {
    return () => {
      if (this.props.currentSong.id !== id) {
        this
          .props
          .removeSong(id);
        // console.log(this.props.removeSong)
        if (index < this.props.currentIndex) {
          this
            .props
            .changeIndex(this.props.currentIndex - 1)
        }
        console.log(id)
        console.log(this.props.currentSong.id)
        // console.log(this.props.currentIndex)
      }
    }
  }

  // selectSong(song) {     return (e) => {
  // this.props.changeCurrentSong(song);     }; }

  render() {
    let list = this.props.currentSongList
    const playlist = list.length
      ? list[0].map((songs, index) => {
        return <li
          key={index}
          className="playing-list-sub"
          title={songs.name}
          style={this.props.currentSong.id === songs.id
          ? {
            color: "#6666ff"
          }
          : {
            color: "#fff"
          }}>
          <a className="playing-list-text" onClick={this.playSong(songs, index)}>
            <i className="icon-play"></i>
          </a>
          {songs.name}
        </li>
      })
      : ""
    return (
      <CSSTransition
        in={this.props.show}
        classNames="fade"
        timeout={500}
        onEnter={() => {
        this.setState({showList: true});
      }}
        onExited={() => {
        this.setState({showList: false});
      }}>
        <div
          style={this.state.showList === true
          ? {
            display: "block"
          }
          : {
            display: "none"
          }}
          className="list-song">
          <span className="list-song-title">播放列表</span>
          <div className="playing-list scroll">
            <div className="inner-playing-list">
              <ul>{playlist}</ul>
            </div>
          </div>
        </div>
      </CSSTransition>
    )
  }
}

export default PlayList;
