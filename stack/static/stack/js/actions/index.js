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

export const deleteCardComplete = () => {
    return {
        type: 'DELETE_CARD_COMPLETE'
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

export const cardEnter = (location) => {
    return {
        type: 'CARD_ENTER',
        location: location
    }
};

export const cardLeave = (location) => {
    return {
        type: 'CARD_LEAVE',
        location: location
    }
};