import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import SideBar from './components/SideBar/sidebar';
import Discover from './components/Discover/discover';
import Playlist from './components/PlayList/playlist';
import PlaySongList from './containers/PlaySongList';
import Artist from './components/Artist/artist';
import ArtistDetail from './containers/Artist';
import List from './components/List/list';
import Album from './components/Album/album';
import SongList from './containers/SongList';
import Header from './components/Discover/header';
import CurrentPlay from './components/Play/currentplay';
import Song from './components/Song/song';
import {Provider} from "react-redux";
import store from "./redux/store";
import './commpon/css/normalize.css';
import './components/Style/global.scss';
import Search from './containers/Search';
import UserList from './containers/UserList';
import EditUser from './components/UserList/edituser';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="wrap">
          <SideBar/>
          <div className="wrap-body scroll">
            <Header/>
            <Switch>
              <Route path="/discover" component={Discover}/>
              <Route path="/artist" component={Artist}/>
              <Route path="/artists/:id" component={ArtistDetail}/>
              <Route path="/list" component={List}/>
              <Route path="/playlist" component={Playlist}/>
              <Route path="/playlists/:id" component={PlaySongList}/>
              <Route path="/album" component={Album}/>
              <Route path="/albums/:id" component={SongList}/>
              <Route path="/songs" component={Song}/>
              <Route path="/search" component={Search}/>
              <Route path="/userlist/:id" component={UserList}/>
              <Route path="/edit/:id" component={EditUser}/>
              <Redirect from="/" to="/discover"/>
              <Route component={Discover}/>
            </Switch>
            <CurrentPlay/>
          </div>
        </div>
      </Router>
    </Provider>
  );
};
export default App;
