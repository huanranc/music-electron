import React, { Component } from 'react';
import './search.scss'


class Search extends Component {
  render(){
    return(
      <div className="search">
        <div className="search-input">
				  <input className="text" type="text" placeholder="搜索音乐"/>
				  <button className="button"><i className="icon-search"></i></button>
		    </div>
        <div className="search-tab">
          <span className="tab-sub active">单曲</span>
          <span className="tab-sub">歌手</span>
          <span className="tab-sub">专辑</span>
          <span className="tab-sub">歌单</span>
        </div>
        <div className="search-result"></div>
      </div>
    )
  }
}

export default Search;