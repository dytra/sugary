import React from "react";
import { Button } from "@ui-kitten/components";
import { Alert } from "react-native";

const DatePeriodPicker = ({ handlePressButtonDatePeriod, datePeriod }) => {
  return (
    <Button /*onPress={handlePressButtonDatePeriod}*/ onPress={() => Alert.alert("yolo")}>Yoko {/*datePeriod*/}</Button>
  )
}


export default DatePeriodPicker;
