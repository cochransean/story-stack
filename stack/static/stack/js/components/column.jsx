import React, {Component} from 'react';
import DropContainer from '../containers/dropContainer';
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

            // adjust location based on column number so that columns in same area don't share ids
            let numericLocation = i + this.props.columnNum * this.props.cardsPerColumn;

            rows.push(<DropContainer key={i} location={[this.props.location, numericLocation]}
                                     bottom={(i + 1) % this.props.cardsPerColumn === 0} />);



        }

        return (
            <div className={columnClass}>
                {rows}
            </div>
        )
    }
};