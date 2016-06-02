from django.shortcuts import render
from . models import PlotPoint
from . decks import Deck
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.http import HttpResponse


HAND_SIZE = 9


def stack_index(request):
    request.session['plot_cards_deck'] = Deck(PlotPoint)
    request.session['current_hand'] = request.session['plot_cards_deck'].draw_cards(HAND_SIZE)
    return render(request, 'stack/index.html')


def new_plot_points(request, number_requested=1):
    # Don't allow requested bigger than hand size to prevent people from viewing entire DB contents at once
    number_requested = int(number_requested)
    if number_requested > HAND_SIZE:
        number_requested = HAND_SIZE
    new_points = request.session['plot_cards_deck'].draw_cards(number_requested)
    data = json.dumps(new_points, cls=DjangoJSONEncoder)
    print(data)
    return HttpResponse(data, content_type='application/json')
