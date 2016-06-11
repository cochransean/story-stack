import React, {Component} from 'react';
import DropZone from './dropzone.jsx';
import Card from './card.jsx';
var classNames = require('classnames');

export default class Column extends Component {

    render() {
        let columnClass = classNames({
            'col-xs-3': true,
            'bank': this.props.location === 'bank',
            'stack': this.props.location === 'stack'
        });
        let rows = [];

        // leave the last slot to be rendered in-line since it has different formatting
        for (let i = 0; i < this.props.cardsPerColumn; i++) {

            // push cards where state indicates they are occupied (check if array is empty)
            let occupied = this.props.state[i].length > 0;

            // If desired, could later add capability for multiple cards here by looping over array
            if (occupied) {
                rows.push(<DropZone key={i} location={[this.props.location, i]} bottom={(i + 1) % this.props.cardsPerColumn === 0}>
                    <Card card={this.props.state[i][0]} />
                </DropZone>);
            }
            else {
                rows.push(<DropZone key={i} location={[this.props.location, i]} bottom={(i + 1) % this.props.cardsPerColumn === 0} />);
            }

        }

        return (
            <div className={columnClass}>
                {rows}
            </div>
        )
    }
};