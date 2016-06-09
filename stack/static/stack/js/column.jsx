import React, {Component} from 'react';
import DropZone from './dropzone.jsx';
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
        for (let i = 0; i < this.props.cardsPer; i++) {
            rows.push(<DropZone key={i} location={[this.props.location, i]} bottom={(i + 1) % this.props.cardsPer === 0} />);
        }

        return (
            <div className={columnClass}>
                {rows}
            </div>
        )
    }
};