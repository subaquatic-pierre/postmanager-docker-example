from flask_graphql import GraphQLView
from server.graphql.schema import schema


def initiate_app(app, **kwargs):
    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
    )
