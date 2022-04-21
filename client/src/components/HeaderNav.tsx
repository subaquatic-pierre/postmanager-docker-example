import React from 'react';

import List from '@mui/material/List';

import HeaderNavItem from 'components/HeaderNavItem';

interface Props {
  navList: [NavItem];
}

const HeaderNav = ({ navList }: Props): JSX.Element => {
  return (
    <nav>
      <List>
        {navList.map((navItem, index) => (
          <HeaderNavItem key={index} navItem={navItem} />
        ))}
      </List>
    </nav>
  );
};

export default HeaderNav;
