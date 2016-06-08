/**
 *  Main javascript for the stack component of StoryStack
 */
import {Draggable} from './draggable.js';
import {CardDrop} from './cardDrop.js';
import {CardArea} from './cardArea.js';


// Global Variables
var deletesLeft = 10;
var deleteCounter = $("#delete-counter");
var cardAreas = {"areas": []}; // using object so that it passes by reference



// when DOM is loaded
$(function() {

    // on desktop or tablet
    initDesktop();
});


// prepares interactions for desktop and tablet
function initDesktop() {

    // make cards draggable
    var draggableCards = new Draggable(".card", cardAreas);
    
    // create card areas
    var heap = new CardArea(".heap", ".drop-zone", draggableCards, false, cardAreas);
    var stack = new CardArea("#stack", ".drop-zone", draggableCards, false, cardAreas);

    // update text on delete counter
    deleteCounter.text(deletesLeft);

    // setup card deletions
    var deleteButtons = $( ".delete-card-btn" );
    deleteButtons.click(deleteCard)
}


function deleteCard() {

    var card = $(this).parents(".card");
    var newText;
    var newId;

    // update deletes left
    deletesLeft--;

    // register effect
    $.Velocity.RegisterEffect("callout.pulseLarge", {
    defaultDuration: 900,
    calls:  [
                [ { scale: 2 }, 0.50 ],
                [ { scale: 1 }, 0.50 ]
            ]
    });

    // check delete limit
    if (deletesLeft <= 3) {

        // indicate dwindling number of cards to replace with red background
        deleteCounter.css("background-color", "red");
    }

    if (deletesLeft < 0) {

        // TODO do something to tell the user

        // stop here since limit has been hit
        return
    }

    // update text on counter
    deleteCounter.text(deletesLeft);

    // animate to indicate to user
    deleteCounter.velocity("callout.pulseLarge");

    // if adding countdown, do it here

    // disable mouse pointer changes so it looks like card is actually gone

    // trigger animation
    var fadeOut = card.velocity("transition.shrinkOut", {
        display: "null", // prevent reseting of flex styling
        calls: [
            [ { scale: 5 }, 1 ]
        ],
        reset: { scale: 1 }
    });

    // AJAX request for new card text; numeral at end of URL is number you want
    var ajaxRequest = $.get(plotPointRequestUrl + "1", function (data) {
        newText = data[0]["point_text"];
        newId = data[0]["id"];
    });

    // wait for animation and ajax to be done
    $.when(fadeOut, ajaxRequest).done(function () {

        // animate re-entrance
        card.velocity("transition.shrinkIn", {
            display: "null" // prevent reseting of flex styling
        });

        // update card text
        card.find(".card-text").text(newText);

        // update card id
        card.attr("data-plot-point-id", newId);

    })
}