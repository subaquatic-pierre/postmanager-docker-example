import React from 'react';
import { useMutation } from '@apollo/client';

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

interface Props {
  isEditPost: boolean;
  postId?: string;
  imageSrc?: string;
  postData?: Post;
}

const defaultValues: PostFormData = {
  title: '',
  tags: '',
  coverPhoto: '',
  content,
};

const CreatePost = (): JSX.Element => {
  const [formData, setFormData] = React.useState<PostFormData>(defaultValues);

  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const setImageData = (data: any) => {
    setFormData((oldData) => ({
      ...oldData,
      coverPhoto: data,
    }));
  };

  const setContent = (content: any) => {
    setFormData((oldData) => ({
      ...oldData,
      content,
    }));
  };

  const handleSubmitClick = () => {
    let variables: IPostEditCreateVars = {
      title: formData.title,
      tags: formData.tags,
      content: JSON.stringify(formData.content),
    };

    if (formData.coverPhoto !== '') {
      variables = {
        ...variables,
        mediaData: [
          {
            mediaName: 'cover_photo',
            dataUrl: formData.coverPhoto,
          },
        ],
      };
    }

    createPost({ variables });
  };

  // Set form data if is edit post
  React.useEffect(() => {}, []);
  return (
    <Page>
      <PostHeroImage
        imageSrc={`${formData.coverPhoto}`}
        title={formData.title}
        loading={formData.coverPhoto === ''}
      />

      <Grid container spacing={4} sx={{ mt: 1, mb: 10 }}>
        <Grid item xs={12} sm={6}>
          <CreatePostMeta data={formData} setFormData={setFormData} />
        </Grid>
        <CreatePostImage setImageData={setImageData} />
      </Grid>
      <TextEditor setContent={setContent} />
      <Box sx={{ mb: 4 }} display="flex" justifyContent="flex-end">
        <Button onClick={handleSubmitClick} sx={{ mr: 1 }} variant="contained">
          Submit
        </Button>
      </Box>
    </Page>
  );
};

export default CreatePost;
