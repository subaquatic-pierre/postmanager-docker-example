import React from 'react';

import AppBar from '@mui/material/AppBar';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import HeaderNav from 'components/HeaderNav';
import Link from 'components/Link';

import navList from 'navList';

const Header = (): JSX.Element => {
  return (
    <AppBar position="relative">
      <Container>
        <Toolbar disableGutters>
          <Link to="/">
            <Box display="flex" alignItems="center">
              <AccessibilityIcon sx={{ mr: 2 }} />
              <Typography variant="h6" color="inherit" noWrap>
                PostManager GraphQL
              </Typography>
            </Box>
          </Link>
          <Box sx={{ ml: 'auto' }}>
            <HeaderNav navList={navList} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
