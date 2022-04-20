import os
from flask import Flask


def create_app(flask_config_name=None, **kwargs):
    """
    Entry point to the Flask RESTful Server application.
    """

    env_flask_config_name = os.getenv('APP_SETTINGS')

    app = Flask(__name__, **kwargs)
    app.config.from_object(env_flask_config_name)

    from . import modules
    modules.initiate_app(app)

    return app
