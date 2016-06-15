/**
 * Redux store to manage state
 */
import { createStore, combineReducers } from 'redux'

// Defaults
const STARTING_DELETES = 10;
let blankBank = [];
let blankStack = [];
const bank_size = 9;
const stack_size = 5;
for (let i = 0; i < bank_size; i++) {

    // default to animating true since components will initially animate and then be switched to false upon
    // completion (to prevent brief delay in start from messing up state checks)
    blankBank.push({'contents': [], 'animating': true})
}
for (let i = 0; i < stack_size; i++) {
    blankStack.push({'contents': [], 'animating': false})
}

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DELETE_CARD':
            return state > 0 ? state - 1: 0; // if already at 0 or below, return 0
        case 'WIPE_BOARD':
            return 10;
        default:
            return state;
    }
}

function globalGameInfo(state = { 'deleteCardAnimation': false, 'drawingCards': true }, action) {
    let newData = Object.assign({}, state);
    switch(action.type) {
        case 'DELETE_CARD':
            newData.deleteCardAnimation = true;
            return Object.assign({}, state, newData);
        case 'DELETE_CARD_COMPLETE':
            newData.deleteCardAnimation = false;
            return Object.assign({}, state, newData);
        case 'MOVE_CARD':
            newData.hoverLocation = false;
            return Object.assign({}, state, newData);
        case 'WIPE_BOARD':
            newData.wipingBoard = true;
            return Object.assign({}, state, newData);
        case 'WIPE_COMPLETE':
            newData.wipingBoard = false;
            return Object.assign({}, state, newData);
        default:
            return state
    }
}

/**
 * Expects the given action to be an object specifying type, location (two element array, first element is drop area
 * name, second  is the index which corresponds to position in that drop area), and the card object itself.
 */
function board(state = {'bank': [], 'stack': []}, action) {

    // copy initial state
    let newData = Object.assign({}, state);
    switch (action.type) {
        case 'ADD_CARD':
            newData[action.location[0]][action.location[1]].contents.push(action.card);
            return Object.assign({}, state, newData);

        case 'DELETE_CARD':

            let contents = newData[action.location[0]][action.location[1]].contents;

            // look for the card in the array already
            let indexOf = contents.indexOf(action.card);

            // if not found, do nothing
            if (indexOf < 0) {
                console.log("Card not found in store.");
                return state
            }

            // remove the item from the array
            contents.splice(indexOf, 1);

            return Object.assign({}, state, newData);
        
        case 'MOVE_CARD':

            // For now, I'm doing this all here rather than adding and deleting each card using pre-existing functions
            // because I don't want the state to chance twice which might cause flickering or inconsistent renders.
            // Also, I might later add state changes for "card moving", etc. so that different animations can be
            // played for each.  So, that's why this code is repetitive with what is listed above.
            
            // remove the old card
            let oldLocationIndex = newData[action.oldLocation[0]][action.oldLocation[1]].contents.indexOf(action.card);

            // if not found, do nothing
            if (oldLocationIndex < 0) {
                console.log("Card not found in store.");
                return state
            }

            // remove the item from the array
            newData[action.oldLocation[0]][action.oldLocation[1]].contents.splice(oldLocationIndex, 1);

            // add to the new array
            newData[action.newLocation[0]][action.newLocation[1]].contents.push(action.card);

            return Object.assign({}, state, newData);

        case 'WIPE_BOARD':
            newData['bank'] = JSON.parse(JSON.stringify(blankBank));
            newData['stack'] = JSON.parse(JSON.stringify(blankStack));
            return Object.assign({}, state, newData);

        case 'START_ANIMATION':
            newData[action.location[0]][action.location[1]].animating = true;
            return Object.assign({}, state, newData);

        case 'FINISH_ANIMATION':
            newData[action.location[0]][action.location[1]].animating = false;
            return Object.assign({}, state, newData);

        default:
            return state;
    }
}

let state = {
    'board': {

        // Make deep copy since array contains arrays that will otherwise pass by reference
        'bank': JSON.parse(JSON.stringify(blankBank)),
        'stack': JSON.parse(JSON.stringify(blankStack))
    },
    'counter': STARTING_DELETES,
    'globalGameInfo': {
        deleteCardAnimation: false,
        wipingBoard: false
    }
};




let combinedReducer = combineReducers({ board, counter, globalGameInfo });
let store = createStore(combinedReducer, state);
export default store;