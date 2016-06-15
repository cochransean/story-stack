import React, {Component} from 'react';
import Counter from './counter';
import StackControls from './stackControls';

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
                        <StackControls wipeBoard={this.props.wipeBoard} />
                    </div>
                </div>
            </div>
        )
    }
};