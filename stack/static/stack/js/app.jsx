import React, {Component, PropTypes} from 'react';
import Headers from './headers.jsx';
import DropArea from './dropArea.jsx';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {boardState} from './manager.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = boardState;
    }

    componentDidMount() {
        var component = this;
        const numberOfCards = 9;

        // AJAX request for new card text; numeral at end of URL is number you want
        this.ajaxRequest = $.get(plotPointRequestUrl + numberOfCards, function(cards) {
            console.log(cards);

            cards.forEach(function(card, index) {

                // update in manager
                boardState['bank'][index] = card;
            });

            // setup initial board
            component.setState({boardState});
        });
    }

    componentWillUnmount() {
        this.ajaxRequest.abort();
    }

    render() {
        return (
            <div className="container-fluid">
                <Headers />
                <div id="body" className="row">
                    <DropArea columns={3} cardsPerColumn={3} state={this.state.bank} location='bank'/>
                    <DropArea columns={1} cardsPerColumn={5} state={this.state.stack} location='stack'/>
                </div>
            </div>
        )
    }
};

export default DragDropContext(HTML5Backend)(App);