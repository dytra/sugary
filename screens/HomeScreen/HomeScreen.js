import React, { useState, useEffect, useContext } from 'react';
import { Layout, Text,Button,useTheme,Card,Icon } from "@ui-kitten/components";
import ConsumptionsContext from "../../contexts/ConsumptionsContext";
import Svg from "react-native-svg";
import { StyleSheet, ScrollView,View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme,VictoryPie,VictoryAnimation,VictoryLabel,VictoryScatter } from "victory-native";
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({route,...props}) => {
  const consumptions = useContext(ConsumptionsContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [diffAmount, setDiffAmount] = useState(0);
  const [diffAmountPercent, setDiffAmountPercent] = useState(0);
  const [maxAmount,setMaxAmount] = useState(36);
  const [pieChartData,setPieChartData] = useState([{ x: 1, y: 0 }, { x: 2, y: 100 - 100 }]);
  const theme = useTheme();
  
  const handlePressReset = async () => {
    // setConsumptions([]);
    if(route.params?.setConsumptions) {
      route.params.setConsumptions([]);
      try {
        await AsyncStorage.removeItem('consumptions');
      } catch (e) {
        console.log('error on delete',e);
      }
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
    <Layout style={{flex: 1, /*justifyContent: 'center'*/ alignItems: 'center',/*height:1000,*/overflow:'scroll' }}>
      <ScrollView  showsVerticalScrollIndicator={false} >
      {/* <Text category='h1'>Home</Text> */}
      {/* <Text>Total Amount of Consumptions Today : {totalAmount}gr</Text>
      <Text>Available Glucose to user: {diffAmount}gr</Text> */}
      
      <Text style={{fontSize:11,textAlign:'center',fontWeight:'bold',color:theme['color-primary-300'],marginBottom:6,marginTop:20}}>DAILY CONSUMPTION</Text>
      <Text style={{fontSize:20,textAlign:'center'}}>You have consumed</Text>
      <Text style={{fontSize:20,textAlign:'center'}}>
        <Text style={{fontSize:20,fontWeight:'bold',color:theme['color-primary-400']}}>{diffAmountPercent}%</Text> of your daily consumption</Text>
      <DiffAmountSection pieChartData={pieChartData} theme={theme} diffAmountPercent={diffAmountPercent} totalAmount={totalAmount}/>

      <InfoBox totalAmount={totalAmount} maxAmount={maxAmount} theme={theme} />

      <Button onPress={handlePressReset} style={{alignSelf:'center'}}>Reset</Button>
 
      
      </ScrollView>
    </Layout>

  )
}

const InfoBox = ({totalAmount,maxAmount,theme}) => {
  return(
    <View style={{marginBottom:10}}>
    <Card /*status='warning'*/ style={{marginLeft:10,marginRight:10}}>
      {totalAmount > maxAmount && (
        <Text>You're in danger</Text>
      )}
      {totalAmount < maxAmount && (
        <View style={{flexDirection:'row'}}>
            <Icon fill={theme['text-basic-color']} style={{width: 32,
              height: 32,marginRight:5}} name='droplet-outline'/>
          <View style={{justifyContent:'center'}}>
            <Text>You're fine for now, I think 😝</Text>

          </View>
        </View>
      )}
    </Card>

      
    </View>
  )
}

const DiffAmountSection = ({pieChartData,theme,diffAmountPercent,totalAmount}) => {
  return(
    <View style={{marginTop:-20}}>
      <Svg viewBox="0 0 400 400" width="100%" /*height="100%"*/>
        <VictoryPie
            // width={250} height={250}
            data={pieChartData}
            innerRadius={130}
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
          style={{ fontSize: 56,fill:theme['text-basic-color'],fontWeight:'bold' }}
          x={200} y={180}
          text={`${diffAmountPercent}%`}
        />

        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 23,fill:theme['text-basic-color']}}
          x={200} y={240}
          text={`${totalAmount}gr consumed`}
        />
        
          </Svg>
    </View>
  )
}

export default HomeScreen;