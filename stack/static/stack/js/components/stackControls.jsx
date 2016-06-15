/**
 * Created by cochransean on 6/15/16.
 */
import React, {Component} from 'react';

export default class StackControls extends Component {

    render() {
        return (
            <div id="stack-controls" className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-secondary btn-centered">
                    <i className="fa fa-floppy-o" aria-hidden="true"></i>
                </button>
                <button onClick={() => this.props.wipeBoard()}
                        type="button" className="btn btn-secondary btn-centered">
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-secondary btn-centered">
                    <i className="fa fa-share-alt" aria-hidden="true"></i>
                </button>
            </div>
        )
    }
};