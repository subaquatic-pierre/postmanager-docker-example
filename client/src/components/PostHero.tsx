import React from 'react';

import PostHeroImage from 'components/PostHeroImage';

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

  return <PostHeroImage loading={loading} imageSrc={imageSrc} title={title} />;
};

export default PostHero;
