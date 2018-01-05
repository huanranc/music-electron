import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import Nav from './nav';

class SiderBar extends Component {
  render(){
    return(
      <div className="wrap-siderbar">
        <h2 className="title">MUSIC</h2>
        <Nav />
      </div>
    );
  };
}

export default SiderBar;