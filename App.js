import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, /*Text,*/ Button, SafeAreaView } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { ApplicationProvider, IconRegistry, Layout, /*Text*/BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./components/TabNavigator/TabNavigator";
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default function App() {
  const [consumptions, setConsumptions] = useState([{
    id: 1,
    // inputDate: new Date(),
    amount: 16,
  }, {
    id: 2,
    amount: 32,
  }]);

  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);

  return (

    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />
        {/* <SafeAreaView> */}
        <TabNavigator consumptions={consumptions} setConsumptions={setConsumptions} />
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
