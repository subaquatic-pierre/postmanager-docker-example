from graphene import ObjectType, String, Int, Field, List

from server import post_manager


mock_meta_data = {"id": 1, "title": "Cool post", "tags": "cool tags"}

mock_media_data = {
    "cover_photo": {"file_type": "image/jpeg", "filename": "media/cover_photo.jpg"}
}

mock_post = {
    "meta_data": mock_meta_data,
    "media_data": mock_media_data,
    "content": "cool content",
}


class MediaData(ObjectType):
    data_src = String()


class MediaIndexItem(ObjectType):
    media_name = String()
    filename = String()


class PostMetaData(ObjectType):
    id = Int()
    title = String()
    tags = String()

    @staticmethod
    def from_dict(meta_data_dict):
        return PostMetaData(
            meta_data_dict["id"], meta_data_dict["title"], meta_data_dict["tags"]
        )


class Post(ObjectType):
    meta_data = Field(PostMetaData)
    media_data = Field(List(MediaIndexItem))
    content = String()


class PostQuery(ObjectType):
    all_post_meta_data = Field(List(PostMetaData))
    post_meta_data = Field(PostMetaData, post_id=String(required=True))
    post = Field(Post, post_id=String(required=True))

    media_data = Field(MediaData, post_id=String(), media_name=String())

    def resolve_post(root, info, post_id):
        post = post_manager.get_by_id(post_id)

        media_list = []
        for media_name, data in post.media_index.items():
            media_item = MediaIndexItem(media_name, data["filename"])
            media_list.append(media_item)

        post_meta_data = PostMetaData.from_dict(post.meta_data.to_json())
        post = Post(
            meta_data=post_meta_data,
            media_data=media_list,
            content=post.content,
        )

        return post

    def resolve_post_meta_data(root, info, post_id):
        post = post_manager.get_by_id(post_id)
        post_meta_data_dict = post.meta_data.to_json()
        return PostMetaData.from_dict(post_meta_data_dict)

    def resolve_all_post_meta_data(root, info):
        all_meta_data = []
        for meta_data in post_manager.index:
            post_meta_data = PostMetaData(
                meta_data["id"], meta_data["title"], meta_data["tags"]
            )
            all_meta_data.append(post_meta_data)

        # Build meta data list from index
        return all_meta_data

    def resolve_media_data(root, info, post_id, media_name):
        post = post_manager.get_by_id(post_id)
        media_src = post.get_media(media_name)

        return MediaData(data_src=media_src)
