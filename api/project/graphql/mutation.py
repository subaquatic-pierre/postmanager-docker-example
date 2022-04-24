from graphene import Mutation, String, Field, ObjectType
from project.graphql.query import (
    Post,
    PostMetaData,
    MediaIndexItem,
    MediaData,
    mock_meta_data,
    mock_media_data,
    mock_post,
)
from project import post_manager


class CreatePost(Mutation):
    class Arguments:
        title = String()
        tags = String()
        content = String()
        cover_photo = String(required=False)

    post = Field(lambda: Post)

    def mutate(root, info, title, tags, content, cover_photo):
        index_item = MediaIndexItem(
            mock_media_data["cover_photo"]["file_type"],
            mock_media_data["cover_photo"]["filename"],
        )

        media_data = MediaData(index_item)
        post_meta_data = PostMetaData(
            mock_meta_data["id"], mock_meta_data["title"], mock_meta_data["tags"]
        )

        post = Post(
            meta_data=post_meta_data,
            media_data=media_data,
            content=mock_post["content"],
        )
        return CreatePost(post=post)


class Mutations(ObjectType):
    create_post = CreatePost.Field()
