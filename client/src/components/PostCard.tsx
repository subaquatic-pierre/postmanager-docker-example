import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'components/Link';

import PostCardImage from 'components/PostCardImage';

import { DELETE_POST } from 'queries';

interface Props {
  data: PostMetaData;
}

const PostGridItem = ({ data }: Props): JSX.Element => {
  const navigate = useNavigate();
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId: data.id },
  });

  const handleDeleteClick = async () => {
    const res = await deletePost();
    if (res.errors) {
      console.log(res);
    }
    if (res.data.deletePost.deleted === true) {
      navigate('/', { state: { refetchPosts: true } });
    }
  };

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
        <Button size="small" color="error" onClick={handleDeleteClick}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostGridItem;
