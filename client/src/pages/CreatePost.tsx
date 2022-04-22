import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

import Page from 'components/Page';
import CreatePostMeta from 'components/CreatePostMeta';
import CreatePostImage from 'components/CreatePostImage';
import TextEditor from 'components/TextEditor';
import PostHeroImage from 'components/PostHeroImage';

interface PostData {
  title: string;
  tags: string;
  coverPhoto: string | ArrayBuffer;
  content: any;
}

const defaultValues: PostData = {
  title: '',
  tags: '',
  coverPhoto: '',
  content: '',
};

const CreatePost = (): JSX.Element => {
  const [data, setData] = React.useState(defaultValues);

  const handleTextInputChange = (e: any) => {
    setData((oldData) => ({
      ...oldData,
      [e.target.id]: e.target.value,
    }));
  };

  const setImageData = (data: any) => {
    setData((oldData) => ({
      ...oldData,
      coverPhoto: data,
    }));
  };

  const setContent = (data: any) => {};
  const handleSubmitClick = () => {};

  return (
    <Page>
      {data.coverPhoto ? (
        <PostHeroImage photoUrl={`${data.coverPhoto}`} />
      ) : (
        <Skeleton animation="wave" variant="rectangular" height="400px" />
      )}

      <Grid container spacing={4} sx={{ mt: 1, mb: 10 }}>
        <Grid item xs={12} sm={6}>
          <CreatePostMeta
            data={data}
            handleInputChange={handleTextInputChange}
          />
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
