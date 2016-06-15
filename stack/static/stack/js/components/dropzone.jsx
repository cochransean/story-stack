/**
 * Created by cochransean on 6/9/16.
 */
import React, {Component} from 'react';
let classNames = require('classnames');
import { ItemTypes } from '../constants';
import Card from './card'
let DropTarget = require('react-dnd').DropTarget;
import { VelocityTransitionGroup } from 'velocity-react';


let cardTarget = {

    // actions to take upon drop
    drop(dropProps, monitor) {
        console.log("Drop happened.");

        // get the card that has just been dropped
        let cardProps = monitor.getItem().cardProps;

        // get locations for update
        let oldLocation = cardProps.location;
        let newLocation = dropProps.location;

        // remove card from old spot in state, add to the new spot
        dropProps.moveCard(cardProps.card, oldLocation, newLocation);
    },

    // specify when drop is allowed
    canDrop(props) {

        // only allow drops on empty dropzones
        return props.dropContents.length < 1
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

class DropZone extends Component {

    componentWillReceiveProps(nextProps) {

        let wasOver = this.props.isOver;
        let isOver = nextProps.isOver;

        // I am using this like a typical "dragenter" method per
        // https://gaearon.github.io/react-dnd/docs-drop-target.html
        if (isOver && !wasOver) {
            console.log('Drag enter.');
        }

        // This must mean the dragged item has just left the area
        // Using this like a typical "dragleave" event
        if (wasOver && !isOver) {
            console.log('Drag leave.');
        }
    }

    render() {

        let component = this;
        let connectDropTarget = this.props.connectDropTarget;
        let isOver = this.props.isOver;
        let canDrop = this.props.canDrop;

        // determine class of drop zone; leave border off last in stack because it is at bottom of screen
        let dropClass = classNames({
            'drop-zone': true,
            
            // check if card is being dragged immediately below, in which case border is already taken care of
            // and will otherwise double up and look wrong
            'bottom-bordered': this.props.location[0] === 'stack' && !this.props.bottom,
            'drop-target': isOver && canDrop
        });

        // build out cards as required
        let rows = [];
        for (let i = 0; i < this.props.dropContents.length; i++) {
            rows.push(<Card key={this.props.dropContents[i].id} counter={this.props.counter} deleteCard={this.props.deleteCard}
                          card={this.props.dropContents[i]} location={this.props.location} />)
        }

        // determine animation
        let exitAnimation = this.props.globalGameInfo.wipingBoard ?
            "transition.perspectiveLeftOut" : "transition.expandOut";

        return (
            
            // pass display "flex" here because velocity starts with display: none and transitions to block normally
            // while our formatting is contingent upon flex display
            connectDropTarget(
                <div className={dropClass}>
                    <VelocityTransitionGroup enter={{animation: "transition.expandIn", display: "flex"}}
                        leave={{
                            animation: exitAnimation,
                            begin: () => {

                                // update in store
                                this.props.startAnimation(this.props.location);

                                // if a card has just been deleted, get a new one
                                if (this.props.globalGameInfo.deleteCardAnimation === true) {

                                    // AJAX request for new card text; numeral at end of URL is number you want
                                    this.ajaxRequest = $.get(plotPointRequestUrl + 1, function(cards) {
                                        cards.forEach(function (newCard) {
                                            component.newCard = newCard;
                                        });
                                    });
                                }
                            },
                            complete: () =>  {
                                this.props.finishAnimation(this.props.location);

                                if (this.props.globalGameInfo.deleteCardAnimation === true) {

                                   // once the AJAX request is complete
                                   this.ajaxRequest.then(() => {

                                        // add the card
                                        component.props.addCard(component.newCard, component.props.location);

                                        // update the new card property
                                        component.newCard = false;

                                        // update state to reflect completed animation
                                        component.props.deleteCardComplete();
                                    }, () => {
                                        console.log("AJAX request for new card failed.")
                                    });
                                }
                            }
                        }}>
                        {rows}
                    </VelocityTransitionGroup>
                </div>
            )
        );
    }
};

export default DropTarget(ItemTypes.CARD, cardTarget, collect)(DropZone);