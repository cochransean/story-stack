export const addCard = (card, location) => {
    return {
        type: 'ADD_CARD',
        card: card,
        location: location
    }
};

export const deleteCard = (card, location) => {
    return {
        type: 'DELETE_CARD',
        card: card,
        location: location
    }
};

export const deleteCardComplete = (location) => {
    return {
        type: 'DELETE_CARD_COMPLETE',
        location: location
    }
};

export const incrementCounter = () => {
    return {
        type: 'INCREMENT'
    }
};

export const moveCard = (card, oldLocation, newLocation) => {
    return {
        type: 'MOVE_CARD',
        card: card,
        oldLocation: oldLocation,
        newLocation: newLocation
    }
};

export const wipeBoard = () => {
    return {
        type: 'WIPE_BOARD'
    }
};

export const wipeComplete = () => {
    return {
        type: 'WIPE_COMPLETE'
    }
};

export const startAnimation = (location) => {
    return {
        type: 'START_ANIMATION',
        location: location
    }
};

export const finishAnimation = (location) => {
    return {
        type: 'FINISH_ANIMATION',
        location: location
    }
};