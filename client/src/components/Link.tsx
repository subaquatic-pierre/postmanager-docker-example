import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  children: any;
  to: string;
  [key: string]: any;
}

const Link = ({ children, ...linkProps }: Props): JSX.Element => {
  return (
    <RouterLink
      style={{ textDecoration: 'none', color: 'inherit' }}
      {...linkProps}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
