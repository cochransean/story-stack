import React, {Component} from 'react';
import Column from './column.jsx';

export default class DropArea extends Component {

    render() {
        let rows = [];

        // leave the last slot to be rendered in-line since it has different formatting
        for (let i = 0; i < this.props.columns; i++) {
            let start = i * this.props.cardsPerColumn;
            let cardsForColumn = this.props.cards.slice(i * this.props.cardsPerColumn, start + this.props.cardsPerColumn);
            rows.push(<Column key={i} deleteCardClick={this.props.deleteCardClick} cardsPerColumn={this.props.cardsPerColumn}
                              cardsForColumn={cardsForColumn} location={this.props.location} columnNum={i}
                              cardEnter={this.props.cardEnter} hoverLocation={this.props.hoverLocation}/>);
        }

        return (
            <div>
                {rows}
            </div>
        )
    }
};