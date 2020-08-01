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
          console.log('init consumptions data');
          console.log(value);
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

  return (

    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />
        {/* <SafeAreaView> */}
        <TabNavigator consumptions={consumptions} setConsumptions={setConsumptions} totalAmount={totalAmount} setTotalAmount={setTotalAmount} />
        {/* </SafeAreaView> */}

      </NavigationContainer>
    </ApplicationProvider>
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
