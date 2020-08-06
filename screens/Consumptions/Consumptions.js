import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Divider, Layout, Text, Button, List, ListItem, TopNavigation, TopNavigationAction, Icon, useTheme } from "@ui-kitten/components"
import TotalAmountContext from "../../contexts/TotalAmountContext";
import AsyncStorage from '@react-native-community/async-storage';

const Consumptions = ({ navigation, state, route, ...props }) => {
  const { consumptions, setConsumptions, totalAmount, setTotalAmount } = route.params;
  const [localConsumptions, setLocalConsumptions] = useState([]);
  const globalTotalAmount = useContext(TotalAmountContext);
  const theme = useTheme();

  const handlePressRemove = (id) => {
    Alert.alert("Delete Confirmation", "Are you sure you wanna remove this item?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          const newConsumptions =  localConsumptions.filter(item => {
            return item?.id !== id;
          })
          setLocalConsumptions(newConsumptions);
          setConsumptions(newConsumptions);
          await storeData(JSON.stringify(newConsumptions));
          
        }
      },
    ]);
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('consumptions', value);
      console.log('success saving data to async storage');
    } catch (e) {
      console.log('error saving consumption data',e);
    }
  }
  const renderItem = ({ item, index }) => {
    // <ListItem key={index} title={`${item.amount}gr`} style={{ paddingTop: 20, paddingBottom: 20 }} />
    const dateString = new Date(parseInt(item?.createdDate));
    
    const timeString = `${dateString.getHours()}:${dateString.getMinutes()}`
    return (
      <ListItem key={item?.id} style={{ height: 60 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flex: 1 }}>
            <Icon fill={theme['text-basic-color']} name='droplet-outline' />
          </View>
          <View style={{ flex: 6, justifyContent: 'center' }}>
            <Text style={{ fontSize: 9 }}>Today at {timeString}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.amount}gr</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Icon fill={theme['text-danger-color']} name='close-square-outline' onPress={() => handlePressRemove(item?.id)} />
            {/* <Button status='danger' style={{}}>
              
            </Button> */}
          </View>
        </View>
      </ListItem>
    )
  }

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} />
  );


  const TopNavigationSimpleUsageShowcase = () => (
    <TopNavigation
      accessoryLeft={BackAction}
      title='Eva Application'
    />
  );


  async function countTotalAmount(consumptions) {
    return new Promise((resolve, reject) => {
      let tempTotal = 0;
      consumptions.forEach(item => {
        tempTotal = tempTotal + item?.amount;
      });
      resolve(tempTotal);
    });
  }

  useEffect(() => {
    if (consumptions?.length > 0 && localConsumptions?.length === 0) {
      setLocalConsumptions(consumptions);
    }
  }, [consumptions]);


  useEffect(() => {
    async function start() {
      const total = await countTotalAmount(consumptions);
      setTotalAmount(total);
    }
    if (consumptions && consumptions?.length > 0) {
      start();
    }

  }, [consumptions]);



  // const TopNavigationStyling = () => (
  //   <TopNavigation
  //     title={evaProps => <Text {...evaProps}>Title</Text>}
  //     subtitle={evaProps => <Text {...evaProps}>Subtitle</Text>}
  //   />
  // );

  return (
    <>
      <TopNavigationSimpleUsageShowcase />
      <Layout style={{ flex: 1, /*justifyContent: 'center',*/ alignItems: 'center', /*paddingTop: 25*/ }}>
        <Text category='h2'>Consumptions</Text>
        <Text style={{ marginBottom: 5 }}>Total Consumptions Today: {globalTotalAmount}gr</Text>
        <Button status='success' onPress={() => navigation.navigate('Add Consumption', {
          consumptions: localConsumptions,
          setConsumptions: setLocalConsumptions,
        })}>Add</Button>
        <List
          style={styles.container}
          data={localConsumptions}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
        />
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    maxHeight: 250,
    overflow: 'scroll',
    width: '100%',
    // backgroundColor: 'blue',
  },
  safeArea: {
    backgroundColor: 'red',
  }
});


export default Consumptions;