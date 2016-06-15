import React, {Component} from 'react';
import Column from './column.jsx';

export default class DropArea extends Component {

    render() {
        let rows = [];

        // leave the last slot to be rendered in-line since it has different formatting
        for (let i = 0; i < this.props.columns; i++) {
            rows.push(<Column key={i} columnNum={i} cardsPerColumn={this.props.cardsPerColumn}
                              location={this.props.location} />);
        }

        return (
            <div>
                {rows}
            </div>
        )
    }
};