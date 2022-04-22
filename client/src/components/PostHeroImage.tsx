import React from 'react';

import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';

import { fetchData } from 'utils';

interface Props {
  postId: string;
  title: string;
}

const PostHeroImage = ({ postId, title }: Props) => {
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
    return <Skeleton animation="wave" variant="rectangular" height="300px" />;
  } else {
    return (
      <CardMedia
        component={'img'}
        image={imageSrc}
        alt={title}
        height="300px"
      />
    );
  }
};

export default PostHeroImage;
