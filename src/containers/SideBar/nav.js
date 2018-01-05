import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class Nav extends Component {
  render(){
    return(
    <nav className="nav">
      <ul className="nav-bar">
        <li><Link to="/discover">dicover</Link></li>
        <li><Link to="/artist">artist</Link></li>
        <li><Link to="/list">list</Link></li>
        <li><Link to="/playlist">playlist</Link></li>
        <li><Link to="/album">album</Link></li>
      </ul>
    </nav>
    )
  };
}

export default Nav;