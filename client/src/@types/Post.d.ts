interface PostMetaData {
  id: string;
  title: string;
  snippet: string;
  tags: string;
}

interface Post {
  metaData: PostMetaData;
  content: any;
  mediaData: any[];
}

interface CreatePostFormData {
  title: string;
  tags: string;
  content: any;
  mediaData: any[];
}

interface EditPostFormData extends CreatePostFormData {
  postId: string;
}
