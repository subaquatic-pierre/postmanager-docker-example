import os


class BaseConfig:
    SERVER_ROOT = os.path.abspath(os.path.dirname(__file__))
    TESTING = True
    SECRET_KEY = os.environ.get("SECRET_KEY")


class DevelopmentConfig(BaseConfig):
    pass
