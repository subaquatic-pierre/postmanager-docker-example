import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import CreatePostMeta from 'components/CreatePostMeta';
import CreatePostImage from 'components/CreatePostImage';
import TextEditor from 'components/TextEditor';
import PostHeroImage from 'components/PostHeroImage';

import { content } from 'filler';

interface Props {
  isEditPost: boolean;
  postId?: string;
  postData?: any;
  imageSrc?: any;
}

const defaultValues: PostFormData = {
  title: '',
  tags: '',
  coverPhoto: '',
  content,
};

const PostForm = ({
  postId,
  isEditPost,
  postData,
  imageSrc,
}: Props): JSX.Element => {
  const [formData, setFormData] = React.useState<PostFormData>(defaultValues);

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

  const setContent = (data: any) => {
    setFormData((oldData) => ({
      ...oldData,
      content: data,
    }));
  };

  const handleSubmitClick = () => {
    if (isEditPost) {
      const url = `api/${postId}/edit`;

      // PUT METHOD
    } else {
      const url = `api/${postId}`;

      // POST METHOD
    }
    console.log('is edit post', isEditPost);
    console.log(formData);
  };

  //   React.useEffect(() => {
  //     if (isEditPost) {
  //       setFormData({
  //         title: postData.metaData.title,
  //         tags: postData.metaData.tags,
  //         coverPhoto: imageSrc,
  //         content: postData.content,
  //       });
  //     }
  //   }, [postData, imageSrc, isEditPost]);

  return (
    <>
      <PostHeroImage
        imageSrc={`${formData.coverPhoto}`}
        title={formData.title}
        loading={formData.coverPhoto === ''}
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
      <TextEditor
        setContent={setContent}
        content={isEditPost ? formData.content : undefined}
      />
      <Box sx={{ mb: 4 }} display="flex" justifyContent="flex-end">
        <Button onClick={handleSubmitClick} sx={{ mr: 1 }} variant="contained">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default PostForm;
