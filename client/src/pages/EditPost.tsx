import React from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import Page from 'components/Page';
import PostContentSkeleton from 'components/PostContentSkeleton';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import CreatePostMeta from 'components/CreatePostMeta';
import CreatePostImage from 'components/CreatePostImage';
import TextEditor from 'components/TextEditor';
import PostHeroImage from 'components/PostHeroImage';

import { EDIT_POST } from 'queries';

import { content } from 'filler';

const defaultValues: EditPostFormData = {
  postId: '',
  title: '',
  tags: '',
  content,
  mediaData: [],
};

const EditPost = (): JSX.Element => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] =
    React.useState<EditPostFormData>(defaultValues);
  const [postData, setPostData] = React.useState<Post | false>();
  const [imageSrc, setImageSrc] = React.useState<string>('');

  const [editPost, { data, loading, error }] = useMutation(EDIT_POST);

  const getCoverPhotoSrc = (): string => {
    let dataUrl = '';
    formData.mediaData.forEach((mediaItem) => {
      if (mediaItem.mediaName === 'cover_photo') {
        dataUrl = mediaItem.dataUrl;
      }
    });
    return dataUrl;
  };

  const handleSubmitClick = async () => {
    let variables: EditPostFormData = {
      postId: postId,
      title: formData.title,
      tags: formData.tags,
      content: JSON.stringify(formData.content),
      mediaData: [],
    };

    const res = await editPost({ variables });
    if (res.errors) {
      console.log(res);
    }
    if (res.data.deletePost.deleted === true) {
      navigate('/', { state: { refetchPosts: true } });
    }
  };

  // Fetch post data from api
  React.useEffect(() => {}, []);

  if (loading) return <PostContentSkeleton />;

  return (
    <Page>
      <PostHeroImage
        imageSrc={getCoverPhotoSrc()}
        title={formData.title}
        loading={getCoverPhotoSrc() === ''}
      />

      <Grid container spacing={4} sx={{ mt: 1, mb: 10 }}>
        <Grid item xs={12} sm={6}>
          <CreatePostMeta data={formData} setFormData={setFormData} />
        </Grid>
        <CreatePostImage formData={formData} setFormData={setFormData} />
      </Grid>
      <TextEditor data={formData} setFormData={setFormData} />
      <Box sx={{ mb: 4 }} display="flex" justifyContent="flex-end">
        <Button onClick={handleSubmitClick} sx={{ mr: 1 }} variant="contained">
          Submit
        </Button>
      </Box>
    </Page>
  );
};

export default EditPost;
