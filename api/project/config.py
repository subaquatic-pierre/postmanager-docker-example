import os


class BaseConfig:
    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
    TESTING = True
    SECRET_KEY = os.environ.get('SECRET_KEY')

class DevelopmentConfig(BaseConfig):
    pass
