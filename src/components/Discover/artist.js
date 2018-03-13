import React, {Component} from 'react';
import Loading from '../../commpon/Loading/loading';

class Artist extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            loading: true,
            artists: []
        }
    }

    componentDidMount() {
        const date = []
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("/top/artists?offset=0&limit=10", myFetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('未请求成功，状态码为' + response.status)
                }
                response.json().then(json => json.artists.map(item => {
                        let newItem = {}
                        newItem.artName = item.name
                        newItem.picUrl = item.picUrl
                        newItem.albumSize = item.albumSize
                        date.push(newItem)
                        return this.setState({
                            artists: [date],
                            loading: false
                        })
                    })
                ).catch(error => {
                    this.setState({artists: ''})
                })
            }).catch(error => {
            this.setState({artists: ''})
        })
    }

    render() {
        const {artists} = this.state;
        const artistsList = artists.length ?
            artists[0].map((artist, index) => {
                return <li key={index} className="artist-list">
                    <div className="artist-image">
                        <div className="show">
                            <p>{artist.name}</p>
                            <p className="albumSize">{`Release ${artist.albumSize} Albums`}</p>
                        </div>
                        <img alt="example" width="100%" src={artist.picUrl} />
                    </div>
                </li>
            })
            : <Loading title="正在加载..." show={this.state.loading} />
        ;
        return (
            <ul className="artist-content">{artistsList}</ul>
        )
    }
}

export default Artist;