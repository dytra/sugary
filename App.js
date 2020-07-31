import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, /*Text,*/ Button } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { ApplicationProvider, Layout, /*Text*/BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./components/TabNavigator/TabNavigator";

export default function App() {
  const [consumptions, setConsumptions] = useState([{
    id: 1,
    // inputDate: new Date(),
    amount: 16,
  }, {
    id: 2,
    amount: 32,
  }]);

  const handlePressSubmit = (value, navigation) => {
    const newConsumptions = [
      ...consumptions,
      {
        id: consumptions.length + 1,
        amount: value
      }
    ];
    setConsumptions(newConsumptions);
    navigation.navigate('Consumptions', {
      consumptions: newConsumptions,
    });
  }
  return (
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <TabNavigator consumptions={consumptions} setConsumptions={setConsumptions} handlePressSubmit={handlePressSubmit} />
      </ApplicationProvider>

    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
