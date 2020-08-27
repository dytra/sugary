import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Layout, BottomNavigation, BottomNavigationTab, Text, useTheme, Icon } from '@ui-kitten/components';
import { Consumptions, ConsumptionForm, HomeScreen, ProfileScreen } from "../../screens";
import { SafeAreaView } from "react-native";
import OnboardingScreen from "../../screens/OnboardingScreen/OnboardingScreen";

const { Navigator, Screen } = createBottomTabNavigator();

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

  const ProfileIcon = (props) => (
    <Icon {...props} name='person-outline' />
  )
  return (
    <BottomNavigation
      // selectedIndex={state.index === 2 ? 1 : state.index}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index], {
        consumptions: props.consumptions,
        setConsumptions: props.setConsumptions,
        totalAmount: props.totalAmount,
        setTotalAmount: props.setTotalAmount,
        setUserInfo: props.setUserInfo,
        ...props
      }
      )}>
      <BottomNavigationTab title='Today' icon={HomeIcon} />
      <BottomNavigationTab title='Consumptions' icon={FileIcon} />
      <BottomNavigationTab title='Profile' icon={ProfileIcon} />
      {/* <BottomNavigationTab title='Consumptions' icon={FileIcon} /> */}
    </BottomNavigation>

  )
};
const TabNavigator = ({ consumptions, setConsumptions, totalAmount, setTotalAmount, setUserInfo }) => {
  const theme = useTheme();
  // console.log('consumptions now hehe');
  // console.log(consumptions);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme['background-basic-color-1'] }}>
      <Navigator initialRouteName='Users' tabBar={props => <BottomTabBar {...props} consumptions={consumptions} setConsumptions={setConsumptions} totalAmount={totalAmount} setTotalAmount={setTotalAmount} setUserInfo={setUserInfo} /*handlePressSubmit={handlePressSubmit}*/ />} >
        <Screen name='Users' component={HomeScreen} />
        <Screen name='Consumptions' component={Consumptions} />
        <Screen name='Profile' component={ProfileScreen} />
        <Screen name='Add Consumption' component={ConsumptionForm} />
        {/* <Screen name='Onboarding' component={OnboardingScreen} /> */}
      </Navigator>
    </SafeAreaView>
  )
}

export default TabNavigator;