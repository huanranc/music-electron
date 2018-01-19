import React from 'react';
import Album from './album';
import PlayList from './playList';
import NewSong from '../../containers/Nesong';
import Artist from './artist';
const Discover = () => {
    return (
      <div className="discover">
        <div className="discover-list">
          <h3 className="top-title">新碟上架</h3>
          <Album/>
        </div>
        <div className="discover-list">
          <h3 className="top-title">推荐歌单</h3>
          <PlayList />
        </div>
        <div className="discover-list">
          <div className="artist">
            <h3 className="top-title">热门歌手</h3>
            <Artist />
          </div>
          <div className="new-songs">
            <h3 className="top-title">最新音乐</h3>
            <NewSong/>
          </div>
        </div>
      </div>
    );
};

export default Discover;