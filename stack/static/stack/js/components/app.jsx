import React, {Component, PropTypes} from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import StackContainer from '../containers/stackContainer.jsx';
import { Provider } from 'react-redux';
import store from '../store.js';

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div className="container-fluid">
                    <StackContainer key="stackContainer"/>
                </div>
            </Provider>
        )
    }
};

export default DragDropContext(HTML5Backend)(App);