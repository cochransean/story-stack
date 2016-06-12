import React, {Component} from 'react';
var classNames = require('classnames');

export default class Counter extends Component {

    render() {
        let counterClass = classNames({
            'delete-counter': true,
            'critical': this.props.counter <= 3
        });

        return (
            <p className={counterClass}>{this.props.counter}</p>
        )
    }
};