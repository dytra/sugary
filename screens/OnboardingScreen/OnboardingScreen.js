import React, { useState } from "react";
import { StyleSheet, View, Button } from 'react-native';
import { Layout, Text, ViewPager, } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { countAge } from "../../utils/coreutils";

const OnboardingScreen = ({ setShowOnboardingScreen, setMaxGlucoseAmount, setAge }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handlePressConfirm = () => {
    // const age = countAge(date);
    /* save data to userInfo storage */
    const userInfo = {
      birth_date: `${date}`
    }

    storeData('user_info', JSON.stringify(userInfo));
    setShowOnboardingScreen(false);
  }

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
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

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('success saving birth_date to async storage');
    } catch (e) {
      console.log('error saving birth_date data');
    }
  }
  return (
    <Layout style={{ flex: 1 }}>
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Layout
          style={styles.tab}
          level='2'>
          <Text category='h5'>Welcome</Text>
        </Layout>
        <Layout
          style={
            {
              // backgroundColor: 'pink',
              // height: 300,
              height: '100%',
              // flex: 1,
              // alignItems: 'center',
              justifyContent: 'center',
            }
          }
          level='2'>
          <Text category='h5' style={{ textAlign: 'center' }}>Input Date</Text>
          <View>
            <Button onPress={showDatepicker} title="Select Date" />
          </View>
          {/* <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View> */}

          {show && (
            <View>
              {/* <Text>showed</Text> */}
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                textColor="white"
              />
              <Button title="Confirm" onPress={handlePressConfirm}></Button>
            </View>)}
        </Layout>

      </ViewPager>
    </Layout >)
}

const styles = StyleSheet.create({
  tab: {
    // backgroundColor: 'pink',
    // height: 300,
    height: '100%',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingScreen;