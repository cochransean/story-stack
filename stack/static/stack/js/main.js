/**
 *  Main javascript for the stack component of StoryStack
 */

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