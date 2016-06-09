/**
 * Created by cochransean on 6/9/16.
 */
import React, {Component} from 'react';
var classNames = require('classnames');

export default class DropZone extends Component {

    render() {

        // determine class of drop zone; leave border off last in stack because it is at bottom of screen
        var dropClass = classNames({
            'drop-zone': true,
            'bottom-bordered': this.props.location[0] === 'stack' && !this.props.last,
            'bottom-no-border': this.props.location[0] === 'stack' && this.props.last
        });

        return (
            <div className={dropClass}></div>
        );
    }
};