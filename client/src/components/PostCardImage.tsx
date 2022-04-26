import React from 'react';
import { useQuery } from '@apollo/client';

import Skeleton from '@mui/material/Skeleton';
import CardMedia from '@mui/material/CardMedia';

import { GET_MEDIA } from 'queries';

interface Props {
  postId: string;
  mediaName: string;
}

const PostCardImage = ({ postId, mediaName }: Props): JSX.Element => {
  const [imageSrc, setImageSrc] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const { error, data } = useQuery(GET_MEDIA, {
    variables: { postId, mediaName: 'cover_photo' },
    fetchPolicy: 'network-only',
  });

  React.useEffect(() => {
    if (!error && data && !data.mediaData.dataSrc.includes('Error')) {
      setImageSrc(data.mediaData.dataSrc);
      setLoading(false);
    }
  }, [data, error]);

  if (loading) {
    return <Skeleton animation="wave" variant="rectangular" height="300px" />;
  } else {
    return (
      <CardMedia
        component={'img'}
        image={imageSrc}
        alt="random"
        height="300px"
      />
    );
  }
};

export default PostCardImage;
