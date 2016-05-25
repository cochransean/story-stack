/**
 * Draggable: Creates an object to contain, track, and manipulate a single draggable area.
 *
 * Parameters:
 *      _relatedAreas: all card areas that need to be included in calculating drop points (array of cardAreas), optional
 *          expects a key "areas" pointing to an array of related areas (to pass by reference)
 */

Draggable = function(_selector, _relatedAreas) {
    if (Draggable.arguments.length < 1) {
        console.log("Selector is a required argument.");
        return
    }
    this.selector = _selector;
    this.relatedAreas = _relatedAreas ? _relatedAreas: []; // init empty array if param not provided
    this.init();
};


Draggable.prototype.init = function() {
    var draggable = this;
    draggable.interactable = interact(draggable.selector).draggable({
        inertia: true,
        onmove: draggable.dragMoveListener,
        snap: {
            relativePoints: [ { x: 0.5, y: 0.5 } ],
            endOnly: true
        },
        onend: draggable.dragEndListener
    });
    draggable.interactable.parent = draggable; // so functions can be called on parent in event listeners
    document.addEventListener('Targets Updated', function (event) {

        // check if the area just updated is in this draggable's array of associated areas
        draggable.relatedAreas.areas.forEach(function(area) {
            if (area === event.detail) {
                draggable.updateTargets();
            }
        });
    });
};


// updates the targets on the provided draggable, using the targets from the provided card areas
// accepts either an object containing an array of areas under the key "areas" or a single card area to update
Draggable.prototype.updateTargets = function() {
    var draggable = this;
    var targets = [];

    draggable.relatedAreas.areas.forEach(function(cardArea) {
        targets = targets.concat(cardArea.targets);
    });

    draggable.interactable.draggable({
        snap: {
            targets: targets
        }
    });
    console.log(draggable);
};


// Moves draggables according to drag location
Draggable.prototype.dragMoveListener = function(event) {
    var interactable = this; // since this is called by the subordinate interactable
    var draggedElement = event.target;

    // place atop all other page elements
    $(draggedElement).css("z-index", 999);

    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(draggedElement.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(draggedElement.getAttribute('data-y')) || 0) + event.dy;

    // move the element
    interactable.parent.translateElement(draggedElement, x, y);
};


// Resets translation of element so it is placed correctly
Draggable.prototype.dragEndListener = function(event) {
    var interactable = this;
    var draggedElement = event.target;

    // restore original z-index
    $(draggedElement).css("z-index", 1);

    // Resets translation of element so it is placed correctly
    interactable.parent.translateElement(draggedElement, 0, 0);
};


// translate the element with the provided x and y coordinates (in pixels)
Draggable.prototype.translateElement = function(element, x, y) {

    // update the position attributes
    element.setAttribute('data-x', x);
    element.setAttribute('data-y', y);

    // translate the element
    element.style.webkitTransform =
        element.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
};