import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import PostGridItem from 'components/PostCard';

import { ALL_POST_META_DATA } from 'queries';

const PostGrid = (): JSX.Element => {
  const { loading, error, data, refetch } = useQuery(ALL_POST_META_DATA);
  const location: any = useLocation();
  const [postMetaDataList, setPostMetaDataList] = React.useState<
    PostMetaData[]
  >([]);

  React.useEffect(() => {
    if (data) {
      setPostMetaDataList(data.allPostMetaData);
    }
  }, [data]);

  React.useEffect(() => {
    if (location.state && location.state.refetchPosts === true) {
      refetch();
    }
  }, [location]);

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error {JSON.stringify(error)}</div>;

  return (
    <Grid data-testid="main-grid" container spacing={4} sx={{ mt: 1, mb: 10 }}>
      {postMetaDataList.map((postMetaData, index) => (
        <Grid
          item
          data-testid="main-grid-item"
          key={index}
          xs={12}
          sm={6}
          md={4}
        >
          <PostGridItem data={postMetaData} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostGrid;
