import React from 'react';

import AppBar from '@mui/material/AppBar';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import HeaderNav from 'components/HeaderNav';

const Header = (): JSX.Element => {
  return (
    <AppBar position="relative">
      <Container>
        <Toolbar disableGutters>
          <AccessibilityIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            PostManager GraphQL
          </Typography>
          <Box sx={{ ml: 'auto' }}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
