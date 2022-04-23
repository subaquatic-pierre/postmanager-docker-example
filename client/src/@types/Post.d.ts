interface PostMetaData {
  id: string;
  title: string;
  snippet: string;
  tags: string;
}

interface Post {
  metaData: PostMetaData;
  content: any;
  media: any[];
}

interface PostFormData {
  title: string;
  tags: string;
  coverPhoto: string | ArrayBuffer;
  content: any;
}
