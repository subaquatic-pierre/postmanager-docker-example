import os
from flask import Flask
from flask_cors import CORS


def create_app(flask_config_name=None, **kwargs):
    """
    Entry point to the Flask RESTful Server application.
    """

    env_flask_config_name = os.getenv('APP_SETTINGS')

    app = Flask(__name__, **kwargs)
    app.config.from_object(env_flask_config_name)

    CORS(app)

    from project import main
    main.initiate_app(app)

    return app
