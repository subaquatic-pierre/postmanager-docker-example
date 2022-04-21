import React from 'react';

import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';

import Link from 'components/Link';

interface Props {
  navItem: NavItem;
}

const HeaderNavItem = ({ navItem }: Props): JSX.Element => {
  return (
    <ListItem>
      <Link to={navItem.url}>
        <Typography variant="h6">{navItem.title}</Typography>
      </Link>
    </ListItem>
  );
};

export default HeaderNavItem;
