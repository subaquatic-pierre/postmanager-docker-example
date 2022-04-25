import React from 'react';
import { useQuery } from '@apollo/client';

import Page from 'components/Page';
import PostHero from 'components/PostHero';
import PostContentSkeleton from 'components/PostContentSkeleton';
import PostContent from 'components/PostContent';

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
    id: '42',
    title: 'cool',
    snippet: 'cool',
    tags: 'cool tags',
  },
  content: defaultContent,
  media: [],
};

const Post = (): JSX.Element => {
  const { id: postId } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  });

  const [postData, setPostData] = React.useState<Post>(defaultPost);

  React.useEffect(() => {
    if (data) {
      setPostData(data.post);
    }
  }, [data, loading]);

  const { title } = postData.metaData;
  if (error) return <div>Error {JSON.stringify(error)}</div>;

  return (
    <Page>
      <PostHero title={title} postId={postId} />
      {loading ? (
        <PostContentSkeleton />
      ) : (
        <PostContent postId={postId} title={title} content={defaultContent} />
      )}
    </Page>
  );
};

export default Post;
