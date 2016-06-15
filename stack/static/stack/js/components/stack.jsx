import React, {Component, PropTypes} from 'react';
import Headers from './headers.jsx';
import DropArea from './dropArea.jsx';
import { deleteCardClick } from '../actions/index';

export default class Stack extends Component {

    getNewCards() {
        let component = this;
        const numberOfCards = 9;

        // AJAX request for new card text; numeral at end of URL is number you want
        this.ajaxRequest = $.get(plotPointRequestUrl + numberOfCards, function(cards) {

            cards.forEach(function(card, index) {
                component.props.addCard(card, ['bank', index]);
            });
        });
    }

    componentDidMount() {
        this.getNewCards();
    }

    componentWillUpdate(nextProps) {

        // check to make sure board is being wiped
        // I am checking this here because the board is not being wiped most of the time this component updates,
        // so it's more efficient to check early and not loop so much.
        if (!nextProps.globalGameInfo.wipingBoard) {
            return;
        }

        // make sure all animations are complete on bank
        let bank = nextProps.board.bank;
        for (let dropzone of bank) {
            if (dropzone.animating) {
                return
            }
        }

        // If we get to here, must not be wiping the board and animations must be complete
        console.log("board wipe complete");
        this.props.wipeComplete();
        this.getNewCards();
    }

    componentWillUnmount() {
        this.ajaxRequest.abort();
    }

    render() {

        return (
            <div>
                <Headers counter={this.props.counter} wipeBoard={this.props.wipeBoard}  />
                <div id="body" className="row">
                    <DropArea key='bank' columns={3} cardsPerColumn={3} location='bank'/>
                    <DropArea key='stack' columns={1} cardsPerColumn={5} location='stack'/>
                </div>
            </div>
        )
    }
};
