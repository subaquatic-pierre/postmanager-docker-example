import React from 'react';
import axios from 'axios';

import Skeleton from '@mui/material/Skeleton';

import CardMedia from '@mui/material/CardMedia';

interface Props {
  postId: string;
  mediaName: string;
}

const PostCardImage = ({ postId, mediaName }: Props): JSX.Element => {
  const [imageSrc, setImageSrc] = React.useState(
    'https://source.unsplash.com/random',
  );
  const [loading, setLoading] = React.useState(true);

  const fetchImageSrc = async () => {
    const url = `/get-media?postId=${postId}&mediaName=${mediaName}`;

    try {
      const res = await axios.get(url);

      const data = res.data;

      setImageSrc(data.imageSrc);
    } catch (e) {
      setImageSrc('https://source.unsplash.com/random');
      setLoading(false);
      //   console.log(e);
    }
  };

  React.useEffect(() => {
    fetchImageSrc();
  }, []);

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
