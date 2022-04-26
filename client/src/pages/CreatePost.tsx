import React from 'react';

import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Page from 'components/Page';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import CreatePostMeta from 'components/CreatePostMeta';
import CreatePostImage from 'components/CreatePostImage';
import TextEditor from 'components/TextEditor';
import PostHeroImage from 'components/PostHeroImage';

import { content } from 'filler';
import { CREATE_POST } from 'queries';

const defaultValues: CreatePostFormData = {
  title: '',
  tags: '',
  content: '',
  mediaData: [],
};

const CreatePost = (): JSX.Element => {
  const navigate = useNavigate();
  const [formData, setFormData] =
    React.useState<CreatePostFormData>(defaultValues);

  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

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
    let variables: CreatePostFormData = {
      title: formData.title,
      tags: formData.tags,
      content: JSON.stringify(formData.content),
      mediaData: [],
    };

    const res = await createPost({ variables });
    if (res.errors) {
      console.log(res);
    }
    if (res.data) {
      navigate('/', { state: { refetchPosts: true } });
    }
  };

  // Set form data if is edit post
  React.useEffect(() => {}, []);
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

export default CreatePost;
