import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Layout, BottomNavigation, BottomNavigationTab, Text, useTheme, Icon } from '@ui-kitten/components';
import { Consumptions, ConsumptionForm } from "../../screens";
import { SafeAreaView } from "react-native";


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
  const HomeIcon = (props) => (
    <Icon {...props} name='home-outline' />
  )
  const FileIcon = (props) => (
    <Icon {...props} name='droplet-outline' />
  )
  return (
    <BottomNavigation
      test="yolo"
      selectedIndex={state.index === 2 ? 1 : state.index}
      onSelect={index => navigation.navigate(state.routeNames[index], {
        consumptions: props.consumptions,
        setConsumptions: props.setConsumptions,
        totalAmount: props.totalAmount,
        setTotalAmount:props.setTotalAmount,
        ...props
      }
      )}>
      <BottomNavigationTab title='Home' icon={HomeIcon} />
      <BottomNavigationTab title='Consumptions' icon={FileIcon} />
    </BottomNavigation>

  )
};
const TabNavigator = ({ consumptions, setConsumptions,totalAmount,setTotalAmount }) => {
  const theme = useTheme();
  // console.log('consumptions now hehe');
  // console.log(consumptions);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme['background-basic-color-1'] }}>
      <Navigator initialRouteName='Users' tabBar={props => <BottomTabBar {...props} consumptions={consumptions} setConsumptions={setConsumptions} totalAmount={totalAmount} setTotalAmount={setTotalAmount} /*handlePressSubmit={handlePressSubmit}*/ />} >
        <Screen name='Users' component={UsersScreen} />
        <Screen name='Consumptions' component={Consumptions} />
        <Screen name='Add Consumption' component={ConsumptionForm} />
      </Navigator>
    </SafeAreaView>
  )
}

export default TabNavigator;