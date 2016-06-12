/**
 * Created by cochransean on 6/9/16.
 */
import React, {Component} from 'react';
let classNames = require('classnames');
import { ItemTypes } from '../constants';
import Card from './card'
let DropTarget = require('react-dnd').DropTarget;

let cardTarget = {
    drop(props) {
        console.log("Drop happened.");
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class DropZone extends Component {

    componentWillReceiveProps(nextProps) {
        let wasOver = this.props.isOver;
        let isOver = nextProps.isOver;

        // I am using this like a typical "dragenter" method per
        // https://gaearon.github.io/react-dnd/docs-drop-target.html
        // check hover location to prevent infinite recursion
        if (isOver && !wasOver) {
            console.log('Drag enter.');
            this.props.cardEnter(this.props.location);
        }
        
        // This must mean the dragged item has just left the area
        // Using this like a typical "dragleave" event
        if (wasOver && !isOver) {

            // TODO update hover location to be false in case the user drags out of any drop targets
            console.log('Drag leave');
            this.props.cardLeave(this.props.location);
        }
    }

    render() {

        let connectDropTarget = this.props.connectDropTarget;
        let isOver = this.props.isOver;
        let dropBelow = [this.props.location[0], this.props.location[1] + 1];

        // determine class of drop zone; leave border off last in stack because it is at bottom of screen
        let dropClass = classNames({
            'drop-zone': true,
            
            // check if card is being dragged immediately below, in which case border is already taken care of
            // and will otherwise double up and look wrong
            'bottom-bordered': this.props.location[0] === 'stack' && !this.props.bottom &&
                this.props.globalGameInfo.hoverLocation[1] !== dropBelow[1],
            'drop-target': isOver
        });

        // build out cards as required
        let rows = [];
        for (let i = 0; i < this.props.dropContents.length; i++) {
            rows.push(<Card key={this.props.dropContents[i].id} deleteCardClick={this.props.deleteCardClick}
                          card={this.props.dropContents[i]} location={this.props.location} />)
        }

        return (
            connectDropTarget(
                // TODO update properties and do occupied logic here since now should have entire state
                <div className={dropClass}>
                    {rows}
                </div>
            )
        );
    }
};

export default DropTarget(ItemTypes.CARD, cardTarget, collect)(DropZone);