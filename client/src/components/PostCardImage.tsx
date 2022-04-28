import React from 'react';
import { useQuery } from '@apollo/client';

import Skeleton from '@mui/material/Skeleton';
import CardMedia from '@mui/material/CardMedia';

import { GET_MEDIA } from 'queries';

interface Props {
  postId: string;
  mediaName: string;
}

const PostCardImage = ({
  postId,
  mediaName = 'cover_photo',
}: Props): JSX.Element => {
  const [imageSrc, setImageSrc] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const { error, data } = useQuery(GET_MEDIA, {
    variables: { postId, mediaName },
    fetchPolicy: 'network-only',
  });

  React.useEffect(() => {
    if (!error && data && !data.mediaData.dataSrc.includes('Error')) {
      setImageSrc(data.mediaData.dataSrc);
      setLoading(false);
    }
  }, [data, error]);

  if (error) return <div>Error {JSON.stringify(error)}</div>;

  if (loading) {
    return (
      <Skeleton
        data-testid="card-image-loading"
        animation="wave"
        variant="rectangular"
        height="300px"
      />
    );
  } else {
    return (
      <CardMedia
        data-testid="card-image"
        component={'img'}
        image={imageSrc}
        alt="random"
        height="300px"
      />
    );
  }
};

export default PostCardImage;
