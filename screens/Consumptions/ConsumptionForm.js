import React, { useState } from "react";
import { Layout, Text, Input, Button } from "@ui-kitten/components";

const ConsumptionForm = ({ route, navigation }) => {
  const { setConsumptions, handlePressSubmit } = route.params;
  const [value, setValue] = useState();
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>Consumptions</Text>
      <Input
        placeholder='Input glucose consumption in gram (gr)'
        keyboardType='numeric'
        // value={value}
        onChangeText={value => setValue(value)}
      />
      <Button color='success' onPress={() => handlePressSubmit(value,navigation)}>Submit</Button>
      <Button onPress={() => navigation.navigate('Consumptions')}>Back</Button>
    </Layout>
  )
}

export default ConsumptionForm;