import React, {Component} from 'react';
import Counter from './counter'

export default class Headers extends Component {

    render() {
        return (
            <div>
                <div id="page-heading">
                    <p>STORYSTACK</p>
                </div>
                <div id="section-headers" className="row">
                    <div className="flex-inline-text col-xs-9">
                        <p>The Bank</p><Counter counter={this.props.counter}/>
                    </div>
                    <div className="flex-separate-horizontal col-xs-3">
                        <p>The Stack</p>
                        <div id="stack-controls" className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-secondary btn-centered"><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                            <button type="button" className="btn btn-secondary btn-centered"><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
                            <button type="button" className="btn btn-secondary btn-centered"><i className="fa fa-share-alt" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};