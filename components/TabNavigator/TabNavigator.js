import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Layout, BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components';
import { Consumptions, ConsumptionForm } from "../../screens";


const { Navigator, Screen } = createBottomTabNavigator();

const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>Home</Text>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>Today</Text>
  </Layout>
);
const BottomTabBar = ({ navigation, state, ...props }) => {

  return (
    <BottomNavigation
      test="yolo"
      selectedIndex={state.index === 2 ? 1 : state.index}
      onSelect={index => navigation.navigate(state.routeNames[index], {
        consumptions: props.consumptions,
        setConsumptions: props.setConsumptions,
      }
      )}>
      <BottomNavigationTab title='Home' />
      <BottomNavigationTab title='Consumptions' />
    </BottomNavigation>

  )
};
const TabNavigator = ({ consumptions, setConsumptions, }) => {
  // console.log('consumptions now hehe');
  // console.log(consumptions);
  return (
    <Navigator initialRouteName='Users' tabBar={props => <BottomTabBar {...props} consumptions={consumptions} setConsumptions={setConsumptions} /*handlePressSubmit={handlePressSubmit}*/ />} >
      <Screen name='Users' component={UsersScreen} />
      <Screen name='Consumptions' component={Consumptions} />
      <Screen name='Add Consumption' component={ConsumptionForm} />
    </Navigator>
  )
}

export default TabNavigator;