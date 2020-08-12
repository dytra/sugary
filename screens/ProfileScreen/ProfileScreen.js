import React, { useState, useContext, useEffect } from "react";
import { Layout, Text, Icon, Input, Datepicker, Button } from "@ui-kitten/components";
import { View, Alert } from "react-native";
import { subYears } from "date-fns";
import AsyncStorage from '@react-native-community/async-storage';
import UserInfoContext from "../../contexts/UserInfoContext";
const ProfileScreen = ({ route, ...props }) => {
  const { setUserInfo } = route.params;

  const [date, setDate] = useState();
  const minDate = subYears(new Date(), 150);
  const userInfo = useContext(UserInfoContext);
  const useDatepickerState = (initialDate = null) => {
    const [localDate, localSetDate] = React.useState(date);
    return { date: localDate, onSelect: localSetDate };
  };
  const minMaxPickerState = useDatepickerState(date);
  const ProfileIcon = (props) => (
    <Icon {...props} name='person-outline' width={76} height={76} fill='white' />
  )
  const CalendarIcon = (props) => (
    <Icon {...props} name='calendar' />
  );

  const handleSelectDate = async nextDate => {
    setDate(nextDate);

  }

  const handleClickSave = async () => {
    const newUserInfo = userInfo;
    newUserInfo.birth_date = `${date}`;
    setUserInfo(newUserInfo);
    await storeData('user_info', JSON.stringify(newUserInfo));
    Alert.alert("Success", "Data saved successfully");
  }
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('success saving birth_date to async storage');
    } catch (e) {
      console.log('error saving birth_date data');
    }
  }

  useEffect(() => {
    if (userInfo) {
      const birthDate = userInfo.birth_date;
      setDate(new Date(birthDate));
      console.log('the date is', birthDate);
      // setUseDatepickerState2((initialDate = null) => {
      //   const [date, setDate] = React.useState(new Date(birthDate));
      //   return { date, onSelect: setDate };
      // });
    }
  }, []);

  return (
    <Layout style={{ flex: 1 }} lv>
      <View style={{ alignItems: 'center', paddingTop: 30, }}>
        <ProfileIcon />
      </View>
      {/* <View style={{ paddingHorizontal: 10 }}> */}
      <Datepicker
        label='Birth Date'
        placeholder='Pick Date'
        date={date}
        min={minDate}
        onSelect={handleSelectDate}
        accessoryRight={CalendarIcon}
      // {...minMaxPickerState}
      />

      {/* </View> */}
      <View style={{ marginTop: 'auto', paddingVertical: 15, paddingHorizontal: 15 }}>
        <Button onPress={handleClickSave}>Save</Button>
      </View>
    </Layout>
  )
}

export default ProfileScreen;