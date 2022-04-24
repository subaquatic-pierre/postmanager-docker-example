from graphene import ObjectType, String, Int, Field, List

from project import post_manager


mock_meta_data = {"id": 1, "title": "Cool post", "tags": "cool tags"}

mock_media_data = {
    "cover_photo": {"file_type": "image/jpeg", "filename": "media/cover_photo.jpg"}
}

mock_post = {
    "meta_data": mock_meta_data,
    "media_data": mock_media_data,
    "content": "cool content",
}


class MediaIndexItem(ObjectType):
    file_type = String()
    filename = String()


class MediaData(ObjectType):
    cover_photo = Field(MediaIndexItem)


class PostMetaData(ObjectType):
    id = Int()
    title = String()
    tags = String()


class Post(ObjectType):
    meta_data = Field(PostMetaData)
    media_data = Field(MediaData)
    content = String()


class PostQuery(ObjectType):
    all_post_meta_data = Field(List(PostMetaData))
    post_meta_data = Field(PostMetaData, post_id=String(required=True))
    post = Field(Post, post_id=String(required=True))
    media_data = String(post_id=String(required=True), media_name=String(required=True))

    def resolve_post(root, info, post_id):
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
        return post

    def resolve_post_meta_data(root, info):
        # Build meta
        return PostMetaData(id=1, title="Cool", tags="cool post")

    def resolve_all_post_meta_data(root, info):
        # Get postmanager index

        # Build meta data list from index
        return [PostMetaData(id=1, title="cool", tags="cool tags")]

    def resolve_media_data(root, info, post_id, media_name):
        # Call get media from post manager

        # Return media_data string
        pass
