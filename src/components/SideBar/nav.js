import React, { Component } from 'react';
import {
  NavLink
} from 'react-router-dom';
import './nav.scss';
class Nav extends Component {
  render(){
    return(
    <nav className="nav">
      <ul className="nav-bar">
        <li><NavLink to="/discover">dicover</NavLink></li>
        <li><NavLink to="/artist">artist</NavLink></li>
        <li><NavLink to="/list">list</NavLink></li>
        <li><NavLink to="/playlist">playlist</NavLink></li>
        <li><NavLink to="/album">album</NavLink></li>
      </ul>
    </nav>
    )
  };
}

export default Nav;