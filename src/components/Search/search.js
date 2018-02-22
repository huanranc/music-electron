import React, { Component } from 'react';
import {
  NavLink
} from 'react-router-dom';
import Loading from '../../commpon/Loading/loading';
import index from 'react-lazyload';

class Search extends Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount() {
  //   var myFetchOptions ={
  //     method:'GET'
  //   };
  //   fetch("/search?keywords="+,myFetchOptions)
  //   .then(response => response.json())
  //   .then(json => {
  //     this.setState({
  //      
  //     })}
  // );
  // }
  render(){
    return(
      <div className="search">
        <input type="text" />
        <div className="search-text"></div>
      </div>
    )
  }
}

export default Search;