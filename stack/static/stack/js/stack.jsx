import React, {Component} from 'react';
import Card from './card.jsx';
import DropZone from './dropzone.jsx';

export default class Stack extends Component {

    render() {
        const stackSlots = 5;
        const rows = [];

        // leave the last slot to be rendered in-line since it has different formatting
        for (let i = 0; i < stackSlots; i++) {
            rows.push(<DropZone key={'stackDrop' + i} location={['stack', i]} last={i === stackSlots - 1} />);
        }

        return (
            <div className="col-xs-3" id="stack">
                {rows}
            </div>
        )
    }
};