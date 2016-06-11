export const addCard = (card, location) => {
  return {
    type: 'ADD_CARD',
    card: card,
    location: location
  }
};