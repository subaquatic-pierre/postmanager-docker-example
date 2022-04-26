import React from 'react';
import { useQuery } from '@apollo/client';

import PostHeroImage from 'components/PostHeroImage';

import { GET_MEDIA } from 'queries';

interface Props {
  postId: string;
  title: string;
}

const PostHero = ({ postId, title }: Props): JSX.Element => {
  const [imageSrc, setImageSrc] = React.useState('');
  const { error, data } = useQuery(GET_MEDIA, {
    variables: { postId, mediaName: 'cover_photo' },
  });

  React.useEffect(() => {
    if (!error && data && !data.mediaData.dataSrc.includes('Error')) {
      setImageSrc(data.mediaData.dataSrc);
    }
  }, [data, error]);

  return (
    <PostHeroImage
      loading={imageSrc === ''}
      imageSrc={imageSrc}
      title={title}
    />
  );
};

export default PostHero;
