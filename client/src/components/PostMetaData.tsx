import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Link from 'components/Link';

import { DELETE_POST } from 'queries';

interface Props {
  metaData: PostMetaData;
}

const PostMetaData = ({
  metaData: { title, tags, id: postId },
}: Props): JSX.Element => {
  const navigate = useNavigate();
  const [deletePost, { error }] = useMutation(DELETE_POST, {
    variables: { postId },
  });

  const handleDeleteClick = async () => {
    try {
      const res = await deletePost();

      if (res.data.deletePost.deleted === true) {
        navigate('/', { state: { refetchPosts: true } });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      sx={{ mt: 2 }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="body2">Tags: {tags}</Typography>
        {error && (
          <div data-testid="error-display">{JSON.stringify(error)}</div>
        )}
      </Box>
      <Box>
        <Link to={`/post/${postId}/edit`}>
          <Button sx={{ mr: 1 }} color="success" variant="contained">
            Edit
          </Button>
        </Link>
        <Button
          sx={{ mr: 1 }}
          color="error"
          variant="contained"
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default PostMetaData;
