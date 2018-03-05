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
        <li><NavLink to="/discover">发现</NavLink></li>
        <li><NavLink to="/artist">歌手</NavLink></li>
        <li><NavLink to="/list">排行榜</NavLink></li>
        <li><NavLink to="/playlist">歌单</NavLink></li>
        <li><NavLink to="/album">专辑</NavLink></li>
        <li><NavLink to="/search">搜索</NavLink></li>
      </ul>
    </nav>
    )
  };
}

export default Nav;