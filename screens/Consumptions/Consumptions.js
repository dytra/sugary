import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Layout, Text, Button, List, ListItem, TopNavigation, TopNavigationAction, Icon, useTheme } from "@ui-kitten/components"
import TotalAmountContext from "../../contexts/TotalAmountContext";
const Consumptions = ({ navigation, state, route, ...props }) => {
  const { consumptions, setConsumptions, totalAmount, setTotalAmount } = route.params;
  const globalTotalAmount = useContext(TotalAmountContext);
  const theme = useTheme();
  const renderItem = ({ item, index }) => {
    // <ListItem key={index} title={`${item.amount}gr`} style={{ paddingTop: 20, paddingBottom: 20 }} />
    const dateString = new Date(item?.createdDate);
    const timeString = `${dateString.getHours()}:${dateString.getMinutes()}`
    return (
      <ListItem key={index} style={{ height: 60 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flex: 1 }}>
            <Icon fill={theme['text-basic-color']} name='droplet-outline' />
          </View>
          <View style={{ flex: 6, justifyContent: 'center' }}>
            <Text style={{ fontSize: 9 }}>Today at {timeString}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.amount}gr</Text>
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
          consumptions,
          setConsumptions: setConsumptions,
        })}>Add</Button>
        <List
          style={styles.container}
          data={consumptions}
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