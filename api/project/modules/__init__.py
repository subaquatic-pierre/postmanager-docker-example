from project.modules.main.routes import main


def initiate_app(app, **kwargs):
    app.register_blueprint(main)
