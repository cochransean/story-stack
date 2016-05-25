import random


class Deck:
    """Represents a deck of cards drawn from the database"""
    def __init__(self, model):
        self.potential_cards = {}
        self.get_potential_cards(model)
        self.undrawn_cards = set(self.potential_cards)

    def get_potential_cards(self, model):
        # As the database grows, update this if needed so that the whole database isn't being copied unnecessarily.
        rows = model.objects.all()
        for row in rows:
            self.potential_cards[row.pk] = row.get_dict()

    def draw_cards(self, number):
        """Draws cards from deck, updates undrawn cards and returns dict entry corresponding to each card"""
        if len(self.undrawn_cards) < number:
            # Reset the deck; as database grows will need to reshuffle here also
            self.undrawn_cards = set(self.potential_cards)
        cards_drawn = set(random.sample(self.undrawn_cards, number))

        # Update the deck set so cards aren't drawn repeatedly.
        self.undrawn_cards -= cards_drawn
        # Get the dictionary entries corresponding to each selected card
        return [self.potential_cards[card] for card in cards_drawn]
