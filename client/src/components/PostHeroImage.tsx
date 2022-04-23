import React from 'react';

import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';

interface Props {
  imageSrc: string;
  loading: boolean;
  title: string;
}

const PostHeroImage = ({ imageSrc, title, loading }: Props) => {
  if (loading) {
    return <Skeleton animation="wave" variant="rectangular" height="400px" />;
  } else {
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
          backgroundImage: `url(${imageSrc})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={imageSrc} alt={title} />}
        {/* <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        /> */}
        {/* <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {title}
              </Typography>
            </Box>
          </Grid>
        </Grid> */}
      </Paper>
    );
  }
};

export default PostHeroImage;
