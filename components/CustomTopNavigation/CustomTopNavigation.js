import React from "react";
import { View, Text } from "react-native";
import { Icon, useTheme, Button } from "@ui-kitten/components";


const CustomTopNavigation = ({ handlePressChange, ...props }) => {
  const theme = useTheme();
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' width={25} height={25} fill={theme['text-basic-color']} />
  );
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <View><BackIcon {...props} /></View>
      <View><Text>Consumptions</Text></View>
      <View>
        <Button onPress={handlePressChange}>Change</Button>
      </View>
    </View>
  )
}

export default CustomTopNavigation;