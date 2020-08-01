import React, { useState, useEffect, useContext } from 'react';
import { Layout, Text,Button } from "@ui-kitten/components";
import ConsumptionsContext from "../../contexts/ConsumptionsContext";

const HomeScreen = ({route,...props}) => {
  const consumptions = useContext(ConsumptionsContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [diffAmount, setDiffAmount] = useState(0);
  const maxAmount = 36;


  const handlePressReset = () => {
    // setConsumptions([]);
    if(route.params?.setConsumptions) {
      route.params.setConsumptions([]);
    }
  }
  // useEffect(() => {
  //   if(route.params?.setConsumptions) {

  //   }

  // },[route.params])
  useEffect(() => {
    if (consumptions?.length > 0) {
      let tempTotalAmount = 0;
      consumptions.forEach(item => {
        tempTotalAmount = tempTotalAmount + item?.amount;
      });
      setTotalAmount(tempTotalAmount);
    } else {
      setTotalAmount(0);
    }
  }, [consumptions]);

  // useEffect(() => {
  //   console.log('total cons now',consumptions?.length);
  // },[consumptions]);

  useEffect(() => {
    if (!totalAmount){
      setDiffAmount(0);

    } else {
      const diff = maxAmount - totalAmount;
      setDiffAmount(diff);

    }

  }, [totalAmount,totalAmount]);
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>Home</Text>
      <Text>Total Amount of Consumptions Today : {totalAmount}gr</Text>
      <Text>Available Glucose to user: {diffAmount}gr</Text>
      {totalAmount > maxAmount && (
        <Text>You're in danger</Text>
      )}
      {totalAmount < maxAmount && (
        <Text>You area safe</Text>
      )}
      <Button onPress={handlePressReset}>Reset</Button>
    </Layout>

  )
}

export default HomeScreen;