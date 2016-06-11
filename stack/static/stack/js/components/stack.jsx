import React, {Component, PropTypes} from 'react';
import Headers from './headers.jsx';
import DropArea from './dropArea.jsx';
import {addCard} from '../actions/index'

export default class Stack extends Component {

    componentDidMount() {
        let component = this;
        const numberOfCards = 9;

        // AJAX request for new card text; numeral at end of URL is number you want
        this.ajaxRequest = $.get(plotPointRequestUrl + numberOfCards, function(cards) {

            cards.forEach(function(card, index) {

                component.props.dispatch(addCard(card, ['bank', index]));
            });
        });
    }

    componentWillUnmount() {
        this.ajaxRequest.abort();
    }

    render() {
        return (
            <div>
                <Headers />
                <div id="body" className="row">
                    <DropArea columns={3} cardsPerColumn={3} state={this.props.board.bank} location='bank'/>
                    <DropArea columns={1} cardsPerColumn={5} state={this.props.board.stack} location='stack'/>
                </div>
            </div>
        )
    }
};
