import React, {Component} from 'react';
import Lyric from '../../containers/Song';

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  render() {
    return (
      <div className="sing">
        <Lyric/>
      </div>
    )
  }
}

export default Song;