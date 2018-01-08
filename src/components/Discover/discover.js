import React from 'react';
import Album from './album';
import PlayList from './playList';
import NewSong from './newsong';
import Artist from './artist';
const Discover = () => {
    return (
      <div className="discover">
        <div className="discover-list">
          <h3 className="top-title">New Album</h3>
          <Album/>
        </div>
        <div className="discover-list">
          <h3 className="top-title">Recommend the playlist</h3>
          <PlayList />
        </div>
        <div className="discover-list">
          <div className="artist">
            <h3 className="top-title">Top Artist</h3>
            <Artist />
          </div>
          <div className="new-songs">
            <h3 className="top-title">New Songs</h3>
            <NewSong/>
          </div>
        </div>
      </div>
    );
};

export default Discover;