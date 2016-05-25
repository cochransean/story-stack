/**
 * CardDrop: Creates an object to contain, track, and manipulate a single droppable area.
 *
 * Parameters:
 *      _id: the unique name associated with each (string)
 */

CardDrop = function(_id) {
    this.id = _id;
    this.init();
};


CardDrop.prototype.init = function() {
    var dropZone = this;
    dropZone.interactable = interact("#" + dropZone.id).dropzone({
        accept: ".card",
        overlap: 0.5,
        ondrop: dropZone.dropListener,
        ondragenter: dropZone.dragEnterListener,
        ondragleave: dropZone.dragLeaveListener,
        checker: function (dragEvent,         // related dragmove or dragend
                           event,             // Touch, Pointer or Mouse Event
                           dropped,           // bool default checker result
                           dropzone,          // dropzone Interactable
                           dropElement,       // dropzone elemnt
                           draggable,         // draggable Interactable
                           draggableElement) {// draggable element


                    // only allow drops into empty dropzone elements; call drop activate if pass
                    var check = dropped && $(dropzone._element).children().length < 1;
                    return check;
                 }
    });
    dropZone.interactable.parent = dropZone; // so functions can be called on parent in event listeners
};


// Function to execute after a successful drop
CardDrop.prototype.dropListener = function (event) {

    console.log("Item dropped");
    var dropzoneElement = event.target;

    // Remove unique styling since user is no longer trying to drop (though element will continue to rest in drop zone)
    dropzoneElement.classList.remove('drop-target');

    // add border back on adjacent if not dictated not to in the class and not hovering over heap
    var previousElement = $(dropzoneElement).prev();
    if (!previousElement.hasClass("bottom-no-border") && $("#heap").parents().length === 0) {
        $(dropzoneElement).prev().addClass('bottom-bordered');
    }

    // update DOM
    var droppedElement = event.relatedTarget;
    droppedElement.parentNode.removeChild(droppedElement);
    dropzoneElement.appendChild(droppedElement);
    $(droppedElement).appendTo(dropzoneElement);
};


// Update snapping behavior as elements enter drop zone to enable snapping
CardDrop.prototype.dragEnterListener = function(event) {

    var dropzoneElement = event.target;

    // update styling so borders don't overlap on adjacent
    $(dropzoneElement).prev().removeClass('bottom-bordered');

    // highlight area for drop
    dropzoneElement.classList.add('drop-target');
};


// Called when a dragged element leaves the drop zone
CardDrop.prototype.dragLeaveListener = function(event) {

    // Remove class to indicate not in zone
    var dropzoneElement = event.target;
    dropzoneElement.classList.remove('drop-target');

    // add border back on adjacent if not dictated not to in the class and not hovering over heap
    var previousElement = $(dropzoneElement).prev();
    if (!previousElement.hasClass("bottom-no-border") && $("#heap").parents().length === 0) {
        $(dropzoneElement).prev().addClass('bottom-bordered');
    }
};