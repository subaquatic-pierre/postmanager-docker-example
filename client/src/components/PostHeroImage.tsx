import React from 'react';

import Paper from '@mui/material/Paper';

interface Props {
  photoUrl: string;
}

const PostHeroImage = ({ photoUrl }: Props) => {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        height: '400px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${photoUrl})`,
      }}
    ></Paper>
  );
};

export default PostHeroImage;
