import React from 'react';
import { useQuery } from '@apollo/client';

import Page from 'components/Page';
import PostHero from 'components/PostHero';
import PostContentSkeleton from 'components/PostContentSkeleton';
import PostContent from 'components/PostContent';
import PostMetaData from 'components/PostMetaData';

import { useParams } from 'react-router';
import { paragraph } from 'filler';
import { GET_POST } from 'queries';

const paragraphObject = {
  type: 'paragraph',
  content: paragraph,
};

const parArr = new Array(5).fill(paragraphObject);

const defaultContent = [...parArr];

const defaultPost: Post = {
  metaData: {
    id: '',
    title: '',
    snippet: '',
    tags: '',
  },
  content: [],
  mediaData: [],
};

const Post = (): JSX.Element => {
  const { id: postId } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
    fetchPolicy: 'network-only',
  });

  const [postData, setPostData] = React.useState<Post>(defaultPost);

  React.useEffect(() => {
    if (data) {
      let content;
      try {
        content = JSON.parse(data.post.content);
      } catch {
        content = { blocks: [{ type: 'unstyled', text: data.post.content }] };
      }
      setPostData({
        ...data.post,
        content,
      });
    }
  }, [data, loading]);

  if (error) return <div>Error {JSON.stringify(error)}</div>;

  if (loading) return <PostContentSkeleton />;
  return (
    <Page>
      <PostHero title={postData.metaData.title} postId={postId} />
      <PostMetaData metaData={postData.metaData} />
      <PostContent metaData={postData.metaData} content={postData.content} />
    </Page>
  );
};

export default Post;
