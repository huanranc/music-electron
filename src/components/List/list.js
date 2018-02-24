import React from 'react';
import Charts from './charts';
const List = () => {
    return (
      <div className="content-layout">
        <div className="discover-list">
          <h3 className="top-title">云音乐飙升榜</h3>
          <Charts />
        </div>
      </div>
    );
};

export default List;