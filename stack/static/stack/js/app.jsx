import React, {Component, PropTypes} from 'react';
import Headers from './headers.jsx';
import Stack from './stack.jsx';
import Bank from './bank.jsx';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {

    componentDidMount() {
        const numberOfCards = 9;

        // AJAX request for new card text; numeral at end of URL is number you want
        var ajaxRequest = $.get(plotPointRequestUrl + numberOfCards, function (data) {
            console.log(data);
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <Headers />
                <div id="body" className="row">
                    <Bank />
                    <Stack />
                </div>
            </div>
        )
    }
};

export default DragDropContext(HTML5Backend)(App);