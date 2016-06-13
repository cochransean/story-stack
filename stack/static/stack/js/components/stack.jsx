import React, {Component, PropTypes} from 'react';
import Headers from './headers.jsx';
import DropArea from './dropArea.jsx';
import { deleteCardClick } from '../actions/index';

export default class Stack extends Component {

    componentDidMount() {
        let component = this;
        const numberOfCards = 9;

        // AJAX request for new card text; numeral at end of URL is number you want
        this.ajaxRequest = $.get(plotPointRequestUrl + numberOfCards, function(cards) {

            cards.forEach(function(card, index) {
                component.props.addCard(card, ['bank', index]);
            });
        });
    }

    componentWillUnmount() {
        this.ajaxRequest.abort();
    }

    render() {

        return (
            <div>
                <Headers counter={this.props.counter}  />
                <div id="body" className="row">
                    <DropArea key='bank' columns={3} deleteCardClick={this.props.deleteCardClick} cardsPerColumn={3}
                              cards={this.props.board.bank} cardEnter={this.props.cardEnter} location='bank'
                              hoverLocation={this.props.hoverLocation}/>
                    <DropArea key='stack' columns={1} deleteCardClick={this.props.deleteCardClick} cardsPerColumn={5}
                              cards={this.props.board.stack} cardEnter={this.props.cardEnter} location='stack'
                              hoverLocation={this.props.hoverLocation}/>
                </div>
            </div>
        )
    }
};
