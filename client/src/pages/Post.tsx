import React from 'react';

import Skeleton from '@mui/material/Skeleton';

import Page from 'components/Page';
import PostHero from 'components/PostHero';
import PostContentSkeleton from 'components/PostContentSkeleton';
import PostContent from 'components/PostContent';

import { fetchData } from 'utils';
import { useParams } from 'react-router';
import { paragraph } from 'filler';

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
  const { id } = useParams();
  const [postData, setPostData] = React.useState<Post>(defaultPost);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const url = `/api/post/${id}`;
    fetchData<Post>(url, setPostData, false, defaultPost).then(() =>
      setLoading(false),
    );
  }, []);

  const { id: postId, title } = postData.metaData;

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
