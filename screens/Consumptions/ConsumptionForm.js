import React, { useState } from "react";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import AsyncStorage from '@react-native-community/async-storage';

const ConsumptionForm = ({ route, navigation }) => {
  const { setConsumptions, consumptions } = route.params;
  const [value, setValue] = useState();

  const handlePressSubmit = async (value, navigation) => {
    // console.log('consumptions in form');
    // console.log(route);
    const newConsumptions = [
      ...consumptions,
      {
        id: `${Date.now()}`,
        createdDate: `${Date.now()}`,
        type: 'glucose',
        amount: parseInt(value),
      }
    ];
    storeData(JSON.stringify(newConsumptions));
    setConsumptions(newConsumptions);
    navigation.navigate('Consumptions', {
      consumptions: newConsumptions,
    });
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('consumptions', value);
      console.log('success saving data to async storage');
    } catch (e) {
      console.log('error saving consumption data');
    }
  }

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>Consumptions</Text>
      <Input
        placeholder='Input glucose consumption in gram (gr)'
        keyboardType='numeric'
        onChangeText={value => setValue(value)}
      />
      <Button color='success' onPress={() => handlePressSubmit(value, navigation)}>Submit</Button>
      <Button onPress={() => navigation.navigate('Consumptions')}>Back</Button>
    </Layout>
  )
}

export default ConsumptionForm;