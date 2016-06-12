/**
 * Redux store to manage state
 */
import { createStore, combineReducers } from 'redux'

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DELETE_CARD':
            return state - 1;
        default:
            return state;
    }
}

function hoverLocation(state = false, action) {
    switch(action.type) {
        case 'CARD_ENTER':
            return action.location;

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

            newData[action.location[0]][action.location[1]].push(action.card);
            return Object.assign({}, state, newData);

        case 'DELETE_CARD':

            // look for the card in the array already
            let indexOf = newData[action.location[0]][action.location[1]].indexOf(action.card);

            // if not found, do nothing
            if (indexOf < 0) {
                console.log("Card not found in store.");
                return state
            }

            // remove the item from the array
            newData[action.location[0]][action.location[1]].splice(indexOf, 1);

            return Object.assign({}, state, newData);

        default:
            return state;
    }
}

let bank = [];
let stack = [];
const bank_size = 9;
const stack_size = 5;
let state = {
    'board': {
        'bank': bank,
        'stack': stack
    },
    'counter': 10,
    'hoverLocation': false
};


// TODO update this to calculate dynamically based on a variable shared with app.js so we aren't hard coding all over
// and having to change in multiple places if we want to change card number
for (let i = 0; i < bank_size; i++) {
    bank.push([])
}
for (let i = 0; i < stack_size; i++) {
    stack.push([])
}

let combinedReducer = combineReducers({ board, counter, hoverLocation });
let store = createStore(combinedReducer, state);
export default store;