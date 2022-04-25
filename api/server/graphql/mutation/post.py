from graphene import Mutation, String, Field, ObjectType, List, InputObjectType, Boolean
from server.graphql.query.post import (
    Post,
    PostMetaData,
    MediaIndexItem,
)

from server import post_manager


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
            media_item = MediaIndexItem(media_item["media_name"], "unkown")
            post_media_data.append(media_item)

            # New post add media
            new_post.add_media(media_item["data_url"], media_item["media_name"])

        # Save new post
        post_manager.save_post(new_post)

        # Create return value
        post_meta_data = PostMetaData.from_dict(new_post.meta_data.to_json())
        post = Post(
            meta_data=post_meta_data,
            media_data=post_media_data,
            content=content,
        )

        return CreatePost(post=post)


class EditPost(Mutation):
    class Arguments:
        post_id = String()
        title = String()
        tags = String()
        content = String()
        media_data = List(PostMediaDataInput, required=False)

    post = Field(lambda: Post)

    def mutate(root, info, post_id, title, tags, content, **kwargs):
        post = post_manager.get_by_id(post_id)

        # Get form data
        meta_data_dict = {"title": title, "tags": tags}

        # Update media
        post_media_data = []
        for media_item in kwargs.get("media_data", []):
            media_item = MediaIndexItem(media_item["media_name"], "unkown")
            post_media_data.append(media_item)

            post.add_media(media_item["data_url"], media_item["media_name"])

        # Update post new post
        post.update_meta_data(meta_data_dict)
        post.update_content(content)

        # Save post
        post_manager.save_post(post)

        # Create return value
        post_meta_data = PostMetaData.from_dict(post.meta_data.to_json())
        post = Post(
            meta_data=post_meta_data,
            media_data=post_media_data,
            content=content,
        )

        return EditPost(post=post)


class DeletePost(Mutation):
    class Arguments:
        post_id = String()

    deleted = Boolean()
    post_id = String()

    def mutate(root, info, post_id):
        post_manager.delete_post(post_id)

        return DeletePost(deleted=True, post_id=post_id)


class PostMutation(ObjectType):
    create_post = CreatePost.Field()
    edit_post = EditPost.Field()
    delete_post = DeletePost.Field()
