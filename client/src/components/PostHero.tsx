import React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

import PostHeroImage from 'components/PostHeroImage';

interface Props {
  postId: string;
  title: string;
}

const PostHero = ({ postId, title }: Props): JSX.Element => {
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <PostHeroImage postId={postId} title={title} />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default PostHero;
