import React, {Component} from 'react';

class TabControl extends Component {

    constructor() {
        super();
        this.state = {
            currentIndex: 0
        }
    }

    changeTabSub(index) {
        return index === this.state.currentIndex ? "active" : ""
    }

    changeResult(index) {
        return index === this.state.currentIndex ? "show" : ""
    }

    render() {
        return (
            <div className="search-content">
                <div className="search-tab">
                    {React.Children.map(this.props.children, (element, index) => {
                        return (
                            <span className={`tab-sub ${this.changeTabSub(index)}`} onClick={() => {
                                this.setState({currentIndex: index})
                            }}>
                {element.props.name}
              </span>
                        )
                    })}
                </div>
                <div className="search-result">
                    {React.Children.map(this.props.children, (element, index) => {
                        return (
                            <div className={`tab-item ${this.changeResult(index)}`}>{element}</div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}

export default TabControl;