import React from 'react';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

const BottomBar = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <BottomNavigationTab title='USERS' />
      <BottomNavigationTab title='ORDERS' />
      <BottomNavigationTab title='TRANSACTIONS' />
    </BottomNavigation>
  );
};

export default BottomBar;