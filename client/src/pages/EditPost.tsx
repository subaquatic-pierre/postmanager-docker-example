import React from 'react';

import { useParams } from 'react-router-dom';

import Page from 'components/Page';
import PostContentSkeleton from 'components/PostContentSkeleton';
import PostForm from 'components/PostForm';

import { fetchData } from 'utils';

const EditPost = (): JSX.Element => {
  const { id: postId } = useParams();
  const [postData, setPostData] = React.useState<Post | false>();
  const [imageSrc, setImageSrc] = React.useState<string>('');
  const [loading, setLoading] = React.useState(false);

  // Fetch post data from api
  React.useEffect(() => {
    const getPostDataUrl = `/api/post/${postId}`;
    const getImageSrcUrl = `/api/get-media?postId=${postId}&media_name=cover_photo`;

    // First get post data
    fetchData<Post | false>(getPostDataUrl, setPostData, false, false).then(
      () =>
        // Then fetch post cover photo
        fetchData<string>(getImageSrcUrl, setImageSrc, 'imageSrc', '').then(
          () => setLoading(false),
        ),
    );
  }, []);

  return (
    <Page>
      {loading ? (
        <PostContentSkeleton />
      ) : (
        <PostForm postId={postId} isEditPost={true} />
      )}
    </Page>
  );
};

export default EditPost;
