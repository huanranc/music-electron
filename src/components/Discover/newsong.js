import React, {Component} from 'react';
import Loading from '../../commpon/Loading/loading';

class NewSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            loading: true
        }
    }

    componentDidMount() {
        const date = []
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("/personalized/newsong", myFetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
                }
                response.json().then(json => json.result.map(item => {
                        let newItem = {}
                        newItem.id = item.id
                        newItem.name = item.name
                        newItem.dt = item.song.duration
                        newItem.picUrl = item.song.album.picUrl
                        newItem.alId = item.song.album.id
                        newItem.alName = item.song.album.name
                        newItem.artName = item.song.artists[0].name
                        newItem.artId = item.song.artists[0].id
                        date.push(newItem)
                        return this.setState({
                            result: [date],
                            loading: false
                        })
                    })
                ).catch(error => {
                    this.setState({result: ''})
                })
            }).catch(error => {
            this.setState({result: ''})
        });
    }

    selectSong(song, songs) {
        return (e) => {
            this.props.changeCurrentSong(song);
            this.props.setSongs([songs]);
        };
    }

    render() {
        const {result} = this.state;
        const resultList = result.length !== 0 ?
            result[0].map((newSong, index) => {
                return <li key={index} className="newsong-list" onClick={this.selectSong(newSong, result[0])}>
                    <div className="newsong-body">
                        <div className="newsong-image">
                            <img alt="example" width="100%" src={newSong.picUrl} />
                        </div>
                        <div className="newsong-text">
                            <p>{newSong.name}</p>
                            <p className="artists">by {newSong.artName}</p>
                        </div>
                    </div>
                </li>
            })
            : <Loading title="正在加载..." show={this.state.loading} />
        ;
        return (
            <div className="newsong">
                <ul className="newsong-content">{resultList}</ul>
            </div>
        )
    }
}

export default NewSong;