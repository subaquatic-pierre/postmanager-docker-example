from server.main.routes import main


def initiate_app(app, **kwargs):
    app.register_blueprint(main)
