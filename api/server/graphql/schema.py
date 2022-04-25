from graphene import ObjectType, Schema

from server.graphql.query.post import PostQuery
from server.graphql.mutation.post import PostMutation


class RootQuery(PostQuery, ObjectType):
    pass


class RootMutation(PostMutation, ObjectType):
    pass


schema = Schema(query=RootQuery, mutation=RootMutation)
