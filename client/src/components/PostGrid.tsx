import React from 'react';
import axios from 'axios';

import Grid from '@mui/material/Grid';

import PostGridItem from 'components/PostGridItem';

const PostGrid = (): JSX.Element => {
  const [postMetaDataList, setPostMetaDataList] = React.useState<
    PostMetaData[]
  >([]);

  const fetchData = async () => {
    const url = 'api/posts';
    try {
      const res = await axios.get(url);
      const data = res.data;
      setPostMetaDataList(data);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchData();
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
