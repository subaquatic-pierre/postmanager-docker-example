import React from 'react';

import Page from 'components/Page';
import PostHero from 'components/PostHero';
import Skeleton from '@mui/material/Skeleton';

import { fetchData } from 'utils';
import { useParams } from 'react-router';

const defaultPost: Post = {
  metaData: {
    id: 'cool',
    title: 'cool',
    snippet: 'cool',
  },
  content: 'Cool post content',
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
      {loading ? (
        <PostHero title={title} postId={postId} />
      ) : (
        <Skeleton variant="rectangular" height="400px" />
      )}
    </Page>
  );
};

export default Post;
