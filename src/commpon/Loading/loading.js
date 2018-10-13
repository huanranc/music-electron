import React from "react"
import Img from "./load.gif"
import "./loading.scss"

class Loading extends React.Component {
  render() {
    let displayStyle = this.props.show === true
      ? {
        display: ""
      }
      : {
        display: "none"
      };
    return (
      <div className="loading-container" style={displayStyle}>
        <div className="loading-wrapper">
          <img src={Img} width="250px" height="250px" alt="loading"/>
          <div className="loading-title">{this.props.title}</div>
        </div>
      </div>
    );
  }
}

export default Loading;