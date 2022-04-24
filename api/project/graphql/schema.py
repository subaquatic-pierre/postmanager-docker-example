from graphene import ObjectType, Schema
from project.graphql.query import PostQuery
from project.graphql.mutation import Mutations


class RootQuery(PostQuery, ObjectType):
    pass


class RootMutation(Mutations, ObjectType):
    pass


schema = Schema(query=RootQuery, mutation=RootMutation)
