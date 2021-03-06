import React from 'react';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Page from 'components/Page';

const PostContentSkeleton = () => {
  const arr = new Array(10).fill('');
  return (
    <Page>
      <Typography variant="h2">
        <Skeleton width={500} />{' '}
      </Typography>
      <Typography variant="caption">
        <Skeleton width={300} />{' '}
      </Typography>
      <Typography variant="caption">
        <Skeleton width={200} />{' '}
      </Typography>
      <Box data-testid="skeleton-text" sx={{ mt: 2 }}>
        {arr.map((el, i) => (
          <Typography key={i} variant="body1">
            <Skeleton width={i % 2 === 0 ? 800 : 810} />
            {''}
          </Typography>
        ))}
      </Box>
    </Page>
  );
};

export default PostContentSkeleton;
