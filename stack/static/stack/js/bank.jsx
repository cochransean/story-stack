import React, {Component} from 'react';
import Column from './column.jsx';

export default class Bank extends Component {

    render() {
        const columns = 3;
        let rows = [];

        // leave the last slot to be rendered in-line since it has different formatting
        for (let i = 0; i < columns; i++) {
            rows.push(<Column key={i} cardsPer={3} location='bank' />);
        }

        return (
            <div>
                {rows}
            </div>
        )
    }
};