import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Link from 'components/Link';

interface Props {
  metaData: PostMetaData;
}

const PostMetaData = ({
  metaData: { title, tags, id: postId },
}: Props): JSX.Element => {
  return (
    <Box
      sx={{ mt: 2 }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="body2">Tags: {title}</Typography>
      </Box>
      <Box>
        <Link to={`/post/${postId}/edit`}>
          <Button sx={{ mr: 1 }} color="success" variant="contained">
            Edit
          </Button>
        </Link>
        <Button sx={{ mr: 1 }} variant="contained">
          Change Cover
        </Button>
        <Button sx={{ mr: 1 }} color="error" variant="contained">
          Delete
        </Button>
        <Button sx={{ mr: 1 }} color="error" variant="contained">
          Delete Cover
        </Button>
      </Box>
    </Box>
  );
};

export default PostMetaData;
