/**
 * CardArea: Creates an object to create, contain, track, and manipulate droppable areas.
 *
 * Parameters:
 *      _parentElement: the selector from the DOM that defines the bounds of the area
 *      _classSelector: the selector from the DOM that defines the class for each droppable area
 *      _insertBehavior: how the area should insert elements when they are dragged over (push, swap, disallow)
 *      _draggableCards: the associated draggable cards interactable from interactable.js; MUST CREATE CARDS FIRST
 *      _relatedAreas: all card areas that need to be included in calculating drop points (array of cardAreas), optional
 *          expects a key "areas" pointing to an array of related areas (to pass by reference)
 */

CardArea = function(_parentElement, _classSelector, _draggableCards, _insertBehavior, _relatedAreas) {

    if (CardArea.arguments.length < 3) {
        console.log("parentElement, classSelector, and draggableCards are required parameters.");
        return
    }

    this.parentElement = _parentElement;
    this.classSelector = _classSelector;
    this.insertBehavior = _insertBehavior;
    if (_relatedAreas) {
        this.relatedAreas = _relatedAreas;
    }
    this.init();
};


CardArea.prototype.init = function() {
    var cardArea = this;
    cardArea.dropZones = [];
    var jQueryDropZones = $(cardArea.parentElement).children(cardArea.classSelector);

    // add a unique ID to each drop zone
    jQueryDropZones.each(function() {
        var id = $(this).attr("id");
        if (id == undefined) {
            console.log("CardArea requires that all elements have an ID.  Please add an ID to the DOM element.")
        }
        var newCardDrop = new CardDrop(id);
        newCardDrop.parent = cardArea; // allow card drops to access methods on this cardArea
        cardArea.dropZones.push(newCardDrop);
    });

    // add this to the global grouping of related areas
    if (cardArea.relatedAreas) {
        cardArea.relatedAreas.areas.push(cardArea);
    }

    // update target areas if browser window is resized
    $( window ).resize(function() {
        cardArea.updateTargets();
    });

    // update targets to allow snapping
    cardArea.updateTargets();
};


// METHODS

// TODO get contents



// Recalculates the targets for this card area's drop zone elements
CardArea.prototype.updateTargets = function () {
    var cardArea = this;
    cardArea.targets = [];
    cardArea.dropZones.forEach(function(dropZone) {

        // get center of each drop point and record
        var dropRect = dropZone.interactable.getRect();
            dropZone.dropCenter = {
                x: dropRect.left + dropRect.width / 2,
                y: dropRect.top + dropRect.height / 2
        };

        // update in target array
        cardArea.targets.push(dropZone.dropCenter);
    });

    console.log(cardArea.targets);

    // dispatch event so related draggables can update themselves, include info on which object had update
    var event = new CustomEvent("Targets Updated", { 'detail': cardArea });
    document.dispatchEvent(event);
};