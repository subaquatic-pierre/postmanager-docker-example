import React from 'react';

import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import ListItem from '@mui/material/ListItem';

interface Props {
  navItem: NavItem;
}

const HeaderNavItem = ({ navItem }: Props): JSX.Element => {
  return (
    <ListItem>
      <Typography component={() => <Link to={navItem.url} />}>
        HeaderNavItem
      </Typography>
    </ListItem>
  );
};

export default HeaderNavItem;
