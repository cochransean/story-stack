import React, {Component} from 'react';
var classNames = require('classnames');
import {VelocityComponent, velocityHelpers} from 'velocity-react';

export default class Counter extends Component {

    constructor(props) {
        super(props);
        this.changeAnimation = velocityHelpers.registerEffect("callout.pulseLarge", {
            defaultDuration: 900,
            calls:  [
                [ { scale: 2 }, 0.50 ],
                [ { scale: 1 }, 0.50 ]
            ]
        });
    }

    // only update when the counter value has changed
    shouldComponentUpdate(nextProps) {
        return nextProps.counter !== this.props.counter;
    }

    componentDidUpdate() {
        this.refs.velocity.runAnimation();
    }

    render() {



        let counterClass = classNames({
            'delete-counter': true,
            'critical': this.props.counter <= 3
        });

        // pass ref to velocity so you can call animation
        return (
            <VelocityComponent ref="velocity" animation={this.changeAnimation}>
                <p className={counterClass}>{this.props.counter}</p>
            </VelocityComponent>
        )
    }
};