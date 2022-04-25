import React from 'react';
import { useQuery } from '@apollo/client';

import Grid from '@mui/material/Grid';

import PostGridItem from 'components/PostCard';

import { ALL_POST_META_DATA } from 'queries';

const PostGrid = (): JSX.Element => {
  const { loading, error, data } = useQuery(ALL_POST_META_DATA);
  const [postMetaDataList, setPostMetaDataList] = React.useState<
    PostMetaData[]
  >([]);

  React.useEffect(() => {
    if (data) {
      setPostMetaDataList(data.allPostMetaData);
    }
  }, [data]);

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error {JSON.stringify(error)}</div>;

  return (
    <Grid container spacing={4} sx={{ mt: 1, mb: 10 }}>
      {postMetaDataList.map((postMetaData, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <PostGridItem data={postMetaData} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostGrid;
