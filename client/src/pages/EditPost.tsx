import React from 'react';

import { useParams } from 'react-router-dom';
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

const defaultValues: PostFormData = {
  title: '',
  tags: '',
  coverPhoto: '',
  content,
};

const EditPost = (): JSX.Element => {
  const { id: postId } = useParams();
  const [formData, setFormData] = React.useState<PostFormData>(defaultValues);
  const [postData, setPostData] = React.useState<Post | false>();
  const [imageSrc, setImageSrc] = React.useState<string>('');
  // const [loading, setLoading] = React.useState(false);

  const [editPost, { data, loading, error }] = useMutation(EDIT_POST);

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

    editPost({ variables });
  };

  // Fetch post data from api
  React.useEffect(() => {}, []);

  return (
    <Page>
      {loading ? (
        <PostContentSkeleton />
      ) : (
        <>
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
          <TextEditor setContent={setContent} content={formData.content} />
          <Box sx={{ mb: 4 }} display="flex" justifyContent="flex-end">
            <Button
              onClick={handleSubmitClick}
              sx={{ mr: 1 }}
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </>
      )}
    </Page>
  );
};

export default EditPost;
