from storyStack.settings.base import *
import dj_database_url


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases
DATABASES = {
    'default': {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
    }
}
db_from_env = dj_database_url.config()
DATABASES['default'].update(db_from_env)

# Allow serving from Heroku
ALLOWED_HOSTS = ['*']