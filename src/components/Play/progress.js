import React, {Component} from 'react';

// 1.接收curretime，更新进度条，从store得到 2.拖拽功能，更新进度条 3.跳转，更新进度条

class Progress extends Component {
  handleProgress = (e) => {
    let settedProgress = (e.screenX - this.playProgress.getBoundingClientRect().left) / this.playProgress.clientWidth;
    console.log(settedProgress)
  }

  render() {
    let {progress} = this.props;
    return (
      <div
        className="play-progress"
        ref={(div) => {
        this.playProgress = div
      }}
        onClick={this.handleProgress}>
        <div
          className="progress-nav"
          ref={(div) => {
          this.progress = div
        }}
          style={{
          width: `${progress}%`
        }}></div>
        <div
          className="progress-btn"
          ref={(div) => {
          this.progressBtn = div
        }}
          style={{
          left: `${progress}%`
        }}></div>
      </div>
    );
  }
}

export default Progress;