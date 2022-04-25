import React from 'react';
import { useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import CreatePostMeta from 'components/CreatePostMeta';
import CreatePostImage from 'components/CreatePostImage';
import TextEditor from 'components/TextEditor';
import PostHeroImage from 'components/PostHeroImage';

import { content } from 'filler';
import { CREATE_POST, EDIT_POST } from 'queries';

interface Props {
  isEditPost: boolean;
  postId?: string;
}

const defaultValues: PostFormData = {
  title: '',
  tags: '',
  coverPhoto: '',
  content,
};

const PostForm = ({ postId, isEditPost }: Props): JSX.Element => {
  const [formData, setFormData] = React.useState<PostFormData>(defaultValues);
  const [
    createPost,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(CREATE_POST);

  const [editPost, { data: editData, loading: editLoading, error: editError }] =
    useMutation(EDIT_POST);

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

  const setContent = (content: any) => {
    setFormData((oldData) => ({
      ...oldData,
      content,
    }));
  };

  const handleSubmitClick = () => {
    interface IVars {
      postId?: string;
      title: string;
      tags: string;
      content: string;
      mediaData?: any;
    }
    let variables: IVars = {
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
    if (isEditPost) {
      editPost({
        variables: {
          postId,
          ...variables,
        },
      });
      // PUT METHOD
    } else {
      createPost({ variables });
    }
    console.log('is edit post', isEditPost);
    console.log(formData);
    console.log(editError);
  };

  React.useEffect(() => {
    console.log(editError);
  }, [editError]);

  if (editError) {
    console.log(editError);
  }

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
