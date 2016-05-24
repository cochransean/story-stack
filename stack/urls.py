from django.conf.urls import url

from . import views

app_name = 'stack'

urlpatterns = [
    url(r'^$', views.stack_index, name='index'),
    url(r'^new-plot-points/$', views.new_plot_points, name='new_plot_points'),
    # The trailing part of the URL is used to capture the number of points requested
    url(r'^new-plot-points/(?P<number_requested>[0-9]+)$', views.new_plot_points, name='new_plot_points')
]
