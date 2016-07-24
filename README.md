# Story Stack
### A place for creators to be inspired or get over their writer's block.
This is Django-based site that currently implements an admin page and one app, which randomly provides plot-points from a Postgres database and then allows users to arrange them into a story framework.  The front-end uses React and Redux.  

Note: The front-end is built on `react-dnd`, which does not support touch gestures, so the current site will not work on mobile.

Development Environment Setup:
1. Run `npm install` from the command line in the project's directory to install the bower dependencies.

2. Use `pip` to install the dependencies listed in `requirements.txt`.

3. A local installation of Postgres is required to run the app locally.  On a Mac, you can install [PostgresApp](http://postgresapp.com/) without any major changes, simply update `storyStack\settings\dev.py` to reflect your username. If not using PostgressApp, you will need to configure your installation to run with the database configuration used in settings.py.

4. Run the local development server with `python manage.py runserver --settings=storyStack.settings.dev`


The master branch automatically pushes to Heroku, to allow for user testing and remote development.  The current master can be viewed at [https://story-stack.herokuapp.com/](https://story-stack.herokuapp.com/).

Notes on migrations:
Migrations should only be run from the master branch to prevent conflicts.  I've had success making and running the migrations locally under the master branch, pushing them to Github, and then running them on Heroku using the command `heroku run python manage.py migrate stack --app story-stack`.






