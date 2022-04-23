import React from 'react';

import Page from 'components/Page';
import PostForm from 'components/PostForm';

const CreatePost = (): JSX.Element => {
  return (
    <Page>
      <PostForm isEditPost={false} />
    </Page>
  );
};

export default CreatePost;
