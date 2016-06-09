import React, {Component, PropTypes} from 'react';
import Headers from './headers.jsx';
import Stack from './stack.jsx';

export default class App extends Component {

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
                    <Stack />
                </div>
            </div>
        )
    }
};