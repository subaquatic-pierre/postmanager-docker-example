import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';

import { fetchData } from 'utils';

interface Props {
  postId: string;
  title: string;
}

const PostHero = ({ postId, title }: Props): JSX.Element => {
  const [imageSrc, setImageSrc] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const url = `/get-media?postId=${postId}&mediaName=cover_photo`;
    fetchData<string>(
      url,
      setImageSrc,
      'imageSrc',
      'https://source.unsplash.com/random',
    ).then(() => setLoading(false));
  }, []);

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

export default PostHero;
