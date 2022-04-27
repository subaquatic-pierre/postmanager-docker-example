import React from 'react';
import { Breakpoint } from '@mui/material/styles';
import Container from '@mui/material/Container';

interface Props {
  children: any;
  maxWidth?: false | Breakpoint;
}

const Page = ({ children, maxWidth = 'lg' }: Props): JSX.Element => {
  return (
    <Container
      data-testid="page-container"
      maxWidth={maxWidth}
      sx={{ my: 1, minHeight: 'calc(100vh - 144px)' }}
    >
      {children}
    </Container>
  );
};

export default Page;
