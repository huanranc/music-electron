import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import SideBar from './containers/SideBar/sidebar';
import Discover from './containers/Discover/discover';
import Playlist from './containers/PlayList/playlist';
import Artist from './containers/Artist/artist';
import List from './containers/List/list';
import Album from './containers/Album/album';
import './commpon/css/normalize.css';
import './containers/Style/global.css';

const App = () => {
  return (
    <Router>
      <div className="wrap">
        <SideBar/>
        <div className="wrap-body">
          <Switch>
            <Route path="/discover" component={Discover} />
            <Route path="/artist" component={Artist} />
            <Route path="/list" component={List} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/album" component={Album} />
            <Redirect from="/" to="/discover" />
            <Route component={Discover}  />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
export default App;

