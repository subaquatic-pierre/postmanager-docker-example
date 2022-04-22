import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Link from 'components/Link';

interface Props {
  postId: string;
  title: string;
  content: any;
}

const renderComponent = (
  type: string,
  content: string,
  index: number,
): JSX.Element => {
  switch (type) {
    case 'header':
      return (
        <Typography key={index} sx={{ mb: 2 }} variant="h5">
          {content}
        </Typography>
      );
    case 'paragraph':
      return (
        <Typography key={index} sx={{ mb: 1 }} variant="body1">
          {content}
        </Typography>
      );

    default:
      return (
        <Typography key={index} variant="body1">
          {content}
        </Typography>
      );
  }
};

const PostContent = ({ title, content, postId }: Props) => {
  return (
    <>
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
      <Box sx={{ mt: 2 }}>
        {content.map((block, i) =>
          renderComponent(block.type, block.content, i),
        )}
      </Box>
    </>
  );
};

export default PostContent;
