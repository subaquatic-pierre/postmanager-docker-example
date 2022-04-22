import React from 'react';

import { useParams } from 'react-router-dom';

import Page from 'components/Page';

const EditPost = (): JSX.Element => {
  const { id: postId } = useParams();
  return <Page>EditPost</Page>;
};

export default EditPost;
