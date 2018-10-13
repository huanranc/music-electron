import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserList from './userlist';
import List from '../../containers/UserSongList';

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            songId: '',
            id:this.props.match.params.id
        }
    }

    render() {
        return (
            <div className="new-ablum">
                <UserList id={this.props.match.params.id}/>
                <List sid={this.props.match.params.id}/>
            </div>
        )
    }
}

export default SongList;