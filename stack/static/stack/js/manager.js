/**
 * Manages state and movements of cards
 */
let bank = [];
let stack = [];

// TODO update this to calculate dynamically based on a variable shared with app.js so we aren't hard coding all over
// and having to change in multiple places if we want to change card number
for (let i = 0; i < 9; i++) {
    bank.push(false)
}
for (let i = 0; i < 5; i++) {
    stack.push(false)
}

export let boardState = {
    'bank': bank,
    'stack': stack
};