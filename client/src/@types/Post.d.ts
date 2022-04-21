interface PostMetaData {
  id: string;
  title: string;
  snippet: string;
}

interface Post {
  metaData: PostMetaData;
  content: any;
  media: any[];
}
