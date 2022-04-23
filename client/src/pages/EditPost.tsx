import React from 'react';

import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Page from 'components/Page';
import CreatePostMeta from 'components/CreatePostMeta';
import CreatePostImage from 'components/CreatePostImage';
import TextEditor from 'components/TextEditor';
import PostHeroImage from 'components/PostHeroImage';
import PostContentSkeleton from 'components/PostContentSkeleton';

import { fetchData } from 'utils';

const defaultValues: PostFormData = {
  title: '',
  tags: '',
  coverPhoto: '',
  content: '',
};

const EditPost = (): JSX.Element => {
  const { id: postId } = useParams();
  const [postData, setPostData] = React.useState<Post | false>();
  const [formData, setFormData] = React.useState<PostFormData>(defaultValues);
  const [imageSrc, setImageSrc] = React.useState<string>('');
  const [loading, setLoading] = React.useState(false);

  const handleTextInputChange = (e: any) => {
    setFormData((oldData) => ({
      ...oldData,
      [e.target.id]: e.target.value,
    }));
  };

  const setImageData = (data: any) => {
    setFormData((oldData) => ({
      ...oldData,
      coverPhoto: data,
    }));
  };

  const setContent = (data: any) => {};
  const handleSubmitClick = () => {};

  // Fetch post data from api
  React.useEffect(() => {
    const getPostDataUrl = `/api/post/${postId}`;
    const getImageSrcUrl = `/api/get-media?postId=${postId}&media_name=cover_photo`;

    // First get post data
    fetchData<Post | false>(getPostDataUrl, setPostData, false, false).then(
      () =>
        // Then fetch post cover photo
        fetchData<string>(getImageSrcUrl, setImageSrc, 'imageSrc').then(() =>
          setLoading(false),
        ),
    );
  }, []);

  // Set form data
  React.useEffect(() => {
    if (postData) {
      setFormData({
        title: postData.metaData.title,
        tags: postData.metaData.tags,
        coverPhoto: imageSrc,
        content: postData.content,
      });
    }
  }, [loading, postData, imageSrc]);

  return (
    <Page>
      {loading ? (
        <PostContentSkeleton />
      ) : (
        <>
          <PostHeroImage
            imageSrc={`${formData.coverPhoto}`}
            title={formData.title}
            loading={loading}
          />

          <Grid container spacing={4} sx={{ mt: 1, mb: 10 }}>
            <Grid item xs={12} sm={6}>
              <CreatePostMeta
                data={formData}
                handleInputChange={handleTextInputChange}
              />
            </Grid>
            <CreatePostImage setImageData={setImageData} />
          </Grid>
          <TextEditor setContent={setContent} />
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
