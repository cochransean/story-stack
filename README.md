# Story Stack
### A place for creators to be inspired or get over their writer's block.
This is Django-based site that currently implements one app, which randomly provides plot-points from a Postgres database and then allows users to arrange them into a story framework.

Development Environment Setup:
1. Run `bower install` from the command line in the project's directory to install the bower dependencies.
2. Use `pip` to install the dependencies listed in `requirements.txt`.
3. A local installation of Postgres is required to run the app locally.  On a Mac, you can install [PostgresApp](http://postgresapp.com/) without any additional configuration in setup.py. If not using PostgressApp, you will need to configure your installation to run with the database configuration used in settings.py.
4. Uncomment the lines of `setup.py` referring to local database configuration. When you push changes to git, comment these lines out again.

The master branch automatically pushed to Heroku, to allow for user testing and remote development.  The current master can be viewed at [https://story-stack.herokuapp.com/](https://story-stack.herokuapp.com/).

Notes on migrations:
Migrations should only be run from the master branch to prevent conflicts.  I've had success making and running the migrations locally under the master branch, pushing them to Github, and then running them on Heroku using the command `heroku run python manage.py migrate stack --app story-stack`.

I have experienced some issues with errors running migrations on Heroku, with "relation does not exist" error messages.  I was able to get around them by temporarily pushing the default `urls.py` (from the base storyStack directory), running the migrations again (successfully), and then pushing the true `urls.py` back to Github.  If there are similar issues in the future, try using this procedures.

If anything happens that requires the app to be totally redeployed on Heroku:

Follow the above procedures, substituting the default `urls.py` or commenting out the actual urls for the site.  Initially run `heroku run python manage.py migrate --app story-stack` for general, non-app-specific migrations.  Then run `heroku run python manage.py migrate stack --app story-stack` and push the actual `urls.py` back to the Github repo.






