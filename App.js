import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, /*Text,*/ Button, SafeAreaView } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { ApplicationProvider, IconRegistry, Layout, /*Text*/BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./components/TabNavigator/TabNavigator";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ModelConsumptions } from "./models";
import AsyncStorage from '@react-native-community/async-storage';
import TotalAmountContext from "./contexts/TotalAmountContext";
import ConsumptionsContext from "./contexts/ConsumptionsContext";
import UserInfoContext from "./contexts/UserInfoContext";
import OnboardingScreen from "./screens/OnboardingScreen/OnboardingScreen";
import { countAge } from './utils/coreutils';
export default function App() {
  const [consumptions, setConsumptions] = useState([{
    id: 1,
    amount: 16,
    createdDate: Date.now(),
    type: 'glucose',
  }, {
    id: 2,
    amount: 32,
    createdDate: Date.now(),
    type: 'glucose',
  }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showOnboardingScreen, setShowOnboardingScreen] = useState(true);
  const [maxGlucoseAmount, setMaxGlucoseAmount] = useState(33);
  const [userInfo, setUserInfo] = useState();
  const [age, setAge] = useState();

  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);


  /* initialize sqlite db */
  useEffect(() => {

    async function getData() {
      try {
        const value = await AsyncStorage.getItem('consumptions');
        if (value !== null) {
          // value previously stored
          // console.log('init consumptions data');
          // console.log(value);
          setConsumptions(JSON.parse(value));
        }
      } catch (e) {
        // error reading value
        console.log(e);
      }
      // await AsyncStorage.clear();
    }
    getData();

  }, []);

  // useEffect(() => {

  // },[]);

  useEffect(() => {
    async function start() {
      const userInfoString = await getData('user_info');
      if (!userInfoString) return;
      const userInfo = JSON.parse(userInfoString);
      if (userInfo) {
        setUserInfo(userInfo);
      }
      // const birthDate = userInfo?.birth_date;
      // if (!birthDate) return;
      // const age = countAge(new Date(birthDate));
      // setAge(age);

    }
    start();
  }, [userInfo])

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      // error reading value
      console.log(e);
    }
    // await AsyncStorage.clear();
  }

  return (
    <UserInfoContext.Provider value={userInfo}>
      <ConsumptionsContext.Provider value={consumptions}>
        <TotalAmountContext.Provider value={totalAmount}>
          <ApplicationProvider {...eva} theme={eva.dark}>
            <NavigationContainer>
              <IconRegistry icons={EvaIconsPack} />
              {/* <SafeAreaView> */}
              {showOnboardingScreen && (
                <OnboardingScreen setShowOnboardingScreen={setShowOnboardingScreen} setMaxGlucoseAmount={setMaxGlucoseAmount} setAge={setAge} />

              )}
              {!showOnboardingScreen && (
                <TabNavigator consumptions={consumptions} setConsumptions={setConsumptions} totalAmount={totalAmount} setTotalAmount={setTotalAmount} />

              )}
              {/* </SafeAreaView> */}

            </NavigationContainer>
          </ApplicationProvider>
        </TotalAmountContext.Provider>
      </ConsumptionsContext.Provider>
    </UserInfoContext.Provider>
  );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
