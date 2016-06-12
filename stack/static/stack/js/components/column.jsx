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
        for (let i = 0; i < this.props.cardsForColumn.length; i++) {

            // push cards where state indicates they are occupied (check if array is empty)
            let occupied = this.props.cardsForColumn[i].length > 0;

            // If desired, could later add capability for multiple cards here by looping over array
            if (occupied) {

                // adjust location based on column number so that columns in same area don't share ids
                let numericLocation = i + this.props.columnNum * this.props.cardsPerColumn;

                rows.push(

                    <DropZone key={i} location={[this.props.location, numericLocation]} cardEnter={this.props.cardEnter}
                                    bottom={(i + 1) % this.props.cardsPerColumn === 0} hoverLocation={this.props.hoverLocation}>
                        <Card key={this.props.cardsForColumn[i][0].id} location={[this.props.location, numericLocation]}
                              deleteCardClick={this.props.deleteCardClick} card={this.props.cardsForColumn[i][0]} />
                    </DropZone>);
            }
            else {
                rows.push(<DropZone key={i} location={[this.props.location, i]} cardEnter={this.props.cardEnter}
                                    bottom={(i + 1) % this.props.cardsPerColumn === 0}
                                    hoverLocation={this.props.hoverLocation} />);
            }

        }

        return (
            <div className={columnClass}>
                {rows}
            </div>
        )
    }
};