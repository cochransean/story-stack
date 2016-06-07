"""
WSGI config for storyStack project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from whitenoise.django import DjangoWhiteNoise

# Note that DJANGO settings variable is set in package.json upon buildout of dependencies in Heroku, to prevent
# Heroku-specific errors

application = get_wsgi_application()
application = DjangoWhiteNoise(application)
