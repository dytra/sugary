import React, { useState, useEffect, useContext } from 'react';
import { Layout, Text,Button,useTheme } from "@ui-kitten/components";
import ConsumptionsContext from "../../contexts/ConsumptionsContext";
import Svg from "react-native-svg";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme,VictoryPie,VictoryAnimation,VictoryLabel,VictoryScatter } from "victory-native";

const HomeScreen = ({route,...props}) => {
  const consumptions = useContext(ConsumptionsContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [diffAmount, setDiffAmount] = useState(0);
  const [diffAmountPercent, setDiffAmountPercent] = useState(0);
  const [maxAmount,setMaxAmount] = useState(36);
  const [pieChartData,setPieChartData] = useState([{ x: 1, y: 0 }, { x: 2, y: 100 - 100 }]);
  const theme = useTheme();

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
      const percent = 100 - Math.round(diff/maxAmount*100);
      setDiffAmountPercent(percent);
    }

  }, [totalAmount,totalAmount]);

  useEffect(() => {
    const data = getData(diffAmountPercent);
    setPieChartData(data);
  },[diffAmountPercent]);

  const  getData = (percent) => {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  return (
    <Layout style={{ flex: 1, /*justifyContent: 'center'*/ alignItems: 'center' }}>
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
          <Svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
            // width={250} height={250}
            data={pieChartData}
            innerRadius={100}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: { fill: ({ datum }) => {
                const color = datum.y > 30 ? "red" : theme['color-success-500'];
                return datum.x === 1 ? color : "transparent";
              }
              }
            }}
          >

          </VictoryPie>

          <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 40,fill:'white',fontWeight:'bold' }}
          x={200} y={90}
          text={`${diffAmountPercent}%`}
        />
          </Svg>
          {/* <CustomLabel role="label"/> */}
 
      
    </Layout>

  )
}

const CustomLabel = () => {
  return (
<VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 30,data: {
            fill: () => {
              return 'red'
            }
          } }}
          x={200} y={200}
          text="Lorem ipsum dolor sit amet"
        />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f5fcff"
  }
});

export default HomeScreen;