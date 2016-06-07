from storyStack.settings.base import *


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases
DATABASES = {
    'default': {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "cochransean",
        "USER": "cochransean",
        "PASSWORD": "",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
