import React from "react";
import { View, Text } from "react-native";
import { Icon, useTheme, Button } from "@ui-kitten/components";


const CustomTopNavigation = ({ handlePressChange, rightText, ...props }) => {
  const theme = useTheme();
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' width={25} height={25} fill={theme['text-basic-color']} />
  );
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 5,
    }}>
      <View><BackIcon {...props} /></View>
      <View><Text style={{ color: theme['text-basic-color'], fontWeight: 'bold' }}>Consumptions</Text></View>
      <View>
        <Button onPress={handlePressChange}>{rightText}</Button>
      </View>
    </View>
  )
}

export default CustomTopNavigation;