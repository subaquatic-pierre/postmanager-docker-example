import React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'components/Link';

import PostCardImage from 'components/PostCardImage';

interface Props {
  data: PostMetaData;
}

const PostGridItem = ({ data }: Props): JSX.Element => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PostCardImage postId={data.id} mediaName="cover_photo" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {data.title}
        </Typography>
        <Typography>{data.snippet}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`/post/${data.id}`}>
          <Button size="small">View</Button>
        </Link>
        <Link to={`/post/${data.id}/edit`}>
          <Button size="small">Edit</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PostGridItem;
