from graphene import Mutation, String, Field, ObjectType, List, InputObjectType
from project.graphql.query import (
    Post,
    PostMetaData,
    MediaItem,
    mock_meta_data,
    mock_media_data,
    mock_post,
)
from project import post_manager


class PostMediaDataInput(InputObjectType):
    filename = String()
    data_url = String()


class CreatePost(Mutation):
    class Arguments:
        title = String()
        tags = String()
        content = String()
        media_data = List(PostMediaDataInput, required=False)

    post = Field(lambda: Post)

    def mutate(root, info, title, tags, content, **kwargs):
        meta_data_dict = {"title": title, "tags": tags}
        new_post = post_manager.new_post(meta_data_dict, content)

        # Add media to post
        post_media_data = []
        for media_item in kwargs.get("media_data", []):
            media_item = MediaItem(media_item["media_name"], "unkown")
            post_media_data.append(media_item)

            # New post add media

        # Save new post
        post_manager.save_post(new_post)

        # Create return value
        post_meta_data = PostMetaData(
            mock_meta_data["id"], mock_meta_data["title"], mock_meta_data["tags"]
        )

        post = Post(
            meta_data=post_meta_data,
            media_data=post_media_data,
            content=content,
        )

        return CreatePost(post=post)


class Mutations(ObjectType):
    create_post = CreatePost.Field()
