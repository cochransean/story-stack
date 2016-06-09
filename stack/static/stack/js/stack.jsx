import React, {Component} from 'react';
import Column from './column.jsx';

export default class Stack extends Component {

    render() {
        const stackSlots = 5;

        return (
            <Column cardsPer={stackSlots} location='stack' />
        )
    }
};