import React from 'react';
import Charts from '../../containers/Chart';

const List = () => {
    return (
        <div className="content-layout">
            <div className="discover-list">
                <h2>云音乐飙升榜</h2>
                <Charts />
            </div>
        </div>
    );
};

export default List;