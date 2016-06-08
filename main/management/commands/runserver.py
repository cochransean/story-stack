from django.contrib.staticfiles.management.commands.runserver import Command as StaticfilesRunserverCommand
import subprocess, shlex


class Command(StaticfilesRunserverCommand):
    help = "Starts a lightweight Web server for development, serves static files and runs webpack file watch."

    # Adds a non-block subprocess that starts the webpack file watcher
    def __init__(self, *args, **kwargs):
        start_webpack = './node_modules/.bin/webpack --config webpack.config.js --watch'
        start_webpack_tokenized = shlex.split(start_webpack)
        subprocess.Popen(start_webpack_tokenized)
        super().__init__(*args, **kwargs)
