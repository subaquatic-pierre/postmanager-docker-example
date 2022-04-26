import React from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';

import Page from 'components/Page';
import PostContentSkeleton from 'components/PostContentSkeleton';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import CreatePostMeta from 'components/CreatePostMeta';
import CreatePostImage from 'components/CreatePostImage';
import TextEditor from 'components/TextEditor';
import PostHeroImage from 'components/PostHeroImage';

import { EDIT_POST, GET_POST, GET_MEDIA } from 'queries';

const defaultValues: EditPostFormData = {
  postId: '',
  title: '',
  tags: '',
  content: '',
  mediaData: [],
};

const EditPost = (): JSX.Element => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const [textEditorContent, setTextEditorContent] = React.useState<any>();
  const [formData, setFormData] =
    React.useState<EditPostFormData>(defaultValues);

  // Queries
  const [getMediaSource] = useLazyQuery(GET_MEDIA, {
    fetchPolicy: 'network-only',
  });
  const { data: postData, error } = useQuery(GET_POST, {
    variables: { postId },
  });
  const [editPost, { loading }] = useMutation(EDIT_POST);

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
      postId,
      title: formData.title,
      tags: formData.tags,
      content: JSON.stringify(textEditorContent),
      mediaData: formData.mediaData,
    };

    const res = await editPost({ variables });
    if (res.errors) {
      console.log(res);
    }
    if (res.data) {
      navigate('/', { state: { refetchPosts: true } });
    }
  };

  const getImageSrc = async () => {
    const res = await getMediaSource({
      variables: { postId: postId, mediaName: 'cover_photo' },
    });
    if (res.error) {
      setFormData((oldData) => ({
        ...oldData,
        mediaData: [],
      }));
      return;
    }
    if (res.data) {
      setFormData((oldData) => ({
        ...oldData,
        mediaData: [
          {
            mediaName: 'cover_photo',
            dataUrl: res.data.mediaData.dataSrc,
          },
        ],
      }));
    }
  };

  // Fetch post data from api
  React.useEffect(() => {
    if (error) {
      console.log(error);
      return;
    }

    if (postData) {
      const post = postData.post;
      getImageSrc();
      try {
        setFormData((oldData) => ({
          ...oldData,
          postId: postData.post.metaData.id,
          title: postData.post.metaData.title,
          tags: postData.post.metaData.tags,
          content: JSON.parse(postData.post.content),
        }));
      } catch (e) {
        console.log(post);
        return;
      }
    }
  }, [postData]);

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
      <TextEditor data={formData} setTextEditorContent={setTextEditorContent} />
      <Box sx={{ mb: 4 }} display="flex" justifyContent="flex-end">
        <Button onClick={handleSubmitClick} sx={{ mr: 1 }} variant="contained">
          Submit
        </Button>
      </Box>
    </Page>
  );
};

export default EditPost;
