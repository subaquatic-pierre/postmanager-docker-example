import React from 'react';

import Page from 'components/Page';
import HomeHero from 'components/HomeHero';
import Divider from '@mui/material/Divider';
import PostGrid from 'components/PostGrid';

const Home = (): JSX.Element => {
  return (
    <Page>
      <HomeHero />
      <Divider sx={{ width: '60%', mx: 'auto', my: 2 }} />
      <PostGrid />
    </Page>
  );
};

export default Home;
