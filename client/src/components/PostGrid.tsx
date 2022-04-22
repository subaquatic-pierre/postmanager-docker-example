import React from 'react';
import axios from 'axios';

import Grid from '@mui/material/Grid';

import PostGridItem from 'components/PostCard';

import { fetchData } from 'utils';

const PostGrid = (): JSX.Element => {
  const [postMetaDataList, setPostMetaDataList] = React.useState<
    PostMetaData[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const url = 'api/posts';

    fetchData<PostMetaData[]>(url, setPostMetaDataList, false, [], true).then(
      () => setLoading(false),
    );
  }, []);

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
