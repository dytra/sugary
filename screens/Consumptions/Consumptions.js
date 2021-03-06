import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { Divider, Layout, Text, Button, List, ListItem, TopNavigation, TopNavigationAction, OverflowMenu, MenuItem, Icon, useTheme } from "@ui-kitten/components"
import TotalAmountContext from "../../contexts/TotalAmountContext";
import AsyncStorage from '@react-native-community/async-storage';
import ConsumptionsContext from "../../contexts/ConsumptionsContext";
import { subDays, differenceInDays, format } from "date-fns";
import DatePeriodPicker from "./DatePeriodPicker";
import CustomTopNavigation from "../../components/CustomTopNavigation/CustomTopNavigation";

const Consumptions = ({ navigation, state, route, ...props }) => {
  const { consumptions, setConsumptions, totalAmount, setTotalAmount } = route.params;
  const [localConsumptions, setLocalConsumptions] = useState([]);
  const [filteredConsumptions, setFilteredConsumptions] = useState([]);
  const [datePeriod, setDatePeriod] = useState('Today');
  const globalTotalAmount = useContext(TotalAmountContext);
  const theme = useTheme();
  const consumptionsCtx = useContext(ConsumptionsContext);

  const toggleDatePeriod = () => {

    if (datePeriod === "Today") {
      setDatePeriod('7 Days')
    } else {
      setDatePeriod('Today');
    }
  }

  const handlePressButtonDatePeriod = () => {
    toggleDatePeriod();
  }

  const handlePressRemove = (id) => {
    Alert.alert("Delete Confirmation", "Are you sure you wanna remove this item?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          const newConsumptions = consumptionsCtx.filter(item => {
            return item?.id !== id;
          })
          // setLocalConsumptions(newConsumptions);
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
      console.log('error saving consumption data', e);
    }
  }
  const renderItem = ({ item, index }) => {
    // <ListItem key={index} title={`${item.amount}gr`} style={{ paddingTop: 20, paddingBottom: 20 }} />
    const dateString = new Date(parseInt(item?.createdDate));

    const timeString = `${dateString.getHours()}:${dateString.getMinutes()}`
    const fullDateString = format(dateString, 'dd MMM yyyy HH:mm');
    return (
      <ListItem key={item?.id} style={{ height: 60 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flex: 1 }}>
            <Icon fill={theme['text-basic-color']} name='droplet-outline' />
          </View>
          <View style={{ flex: 6, justifyContent: 'center' }}>
            {(datePeriod === "Today") && (
              <Text style={{ fontSize: 9 }}>Today at {timeString}</Text>
            )}
            {(datePeriod !== "Today") && (
              <Text style={{ fontSize: 9 }}>{fullDateString}</Text>

            )}
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
    <TopNavigationAction icon={BackIcon} onPress={() => Alert.alert("yowasap", "huh")} />
  );

  const DatePicker = () => {
    return (
      // <RNButton title="Click"></RNButton>
      <Button onPress={handlePressButtonDatePeriod} >{datePeriod}</Button>
      // <TopNavigationAction icon={BackIcon} onPress={() => Alert.alert("pressed")} />
      // <Button onPress={handlePressButtonDatePeriod} >Yo</Button> 


    )
  }

  // const renderRightActions = () => (
  //   <Button>yo</Button>
  // )

  const EditIcon = (props) => (
    <Icon {...props} name='edit' />
  );

  const InfoIcon = (props) => (
    <Icon {...props} name='info' />
  );

  const LogoutIcon = (props) => (
    <Icon {...props} name='log-out' />
  );

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical' />
  );


  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon} />
      <OverflowMenu
        anchor={renderMenuAction}
      // visible={menuVisible}
      // onBackdropPress={toggleMenu}
      >
        <MenuItem accessoryLeft={InfoIcon} title='About' />
        <MenuItem accessoryLeft={LogoutIcon} title='Logout' />
      </OverflowMenu>
    </React.Fragment>
  );


  const TopNavigationSimpleUsageShowcase = () => (
    <TopNavigation
      accessoryLeft={BackAction}
      // accessoryRight={DatePicker}
      accessoryRight={DatePeriodPicker}
      title='Consumptions'
      alignment='center'
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

  // useEffect(() => {
  //   if (consumptions?.length > 0 && localConsumptions?.length === 0) {
  //     setLocalConsumptions(consumptions);
  //   }
  // }, [consumptions]);

  // useEffect(() => {
  //   console.log('consumptins context');
  //   console.log(consumptionsCtx);
  // }, [consumptionsCtx]);


  useEffect(() => {
    async function start() {
      const total = await countTotalAmount(consumptions);
      setTotalAmount(total);
    }
    if (consumptionsCtx && consumptionsCtx?.length > 0) {
      start();
    }

  }, [consumptionsCtx]);

  useEffect(() => {
    let filteredConsumptions;
    if (datePeriod === "7 Days") {
      const last7Days = subDays(new Date(), 7);

      // console.log('diffDay ;', diffDay);
      filteredConsumptions = consumptionsCtx.filter(item => {
        const diffDay = differenceInDays(new Date(parseInt(item?.createdDate)), new Date(last7Days));
        return diffDay <= 7 && diffDay > 0;
      });
    } else if (datePeriod === "Today") {
      filteredConsumptions = consumptionsCtx.filter(item => {
        // console.log(item);
        const inToday = new Date(parseInt(item?.createdDate))?.toDateString() === new Date().toDateString();
        return inToday;
      })
    }
    setFilteredConsumptions(filteredConsumptions);
    // setConsumptions(filteredConsumptions);
    // console.log('filteredConsumptions', filteredConsumptions);

  }, [datePeriod, consumptionsCtx]);


  // const TopNavigationStyling = () => (
  //   <TopNavigation
  //     title={evaProps => <Text {...evaProps}>Title</Text>}
  //     subtitle={evaProps => <Text {...evaProps}>Subtitle</Text>}
  //   />
  // );

  const renderSettingsAction = () => (
    <TopNavigationAction icon={SettingsIcon} onPress={() => Alert.alert("suyoku")} />
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} />
  );



  const SettingsIcon = (props) => (
    <Icon {...props} name='settings' />
  );



  return (
    // <>
    <Layout style={{ flex: 1, /*alignItems: 'center', */ }}>
      {/* <TopNavigationSimpleUsageShowcase /> */}
      {/* <TopNavigationSimpleUsageShowcase /> */}
      <CustomTopNavigation {...props} handlePressChange={toggleDatePeriod} rightText={datePeriod} />
      <View style={{ paddingBottom: 10, borderBottomWidth: 1, width: '100%' }}>
        <Text style={{ marginBottom: 5, textAlign: 'center' }}>Total Consumptions Today: {globalTotalAmount}gr</Text>
        <Button status='success' onPress={() => navigation.navigate('Add Consumption', {
          consumptions: consumptionsCtx,
          setConsumptions: setConsumptions,
        })} style={{ alignSelf: 'center' }}>Add</Button>

      </View>
      <List
        style={styles.container}
        data={filteredConsumptions}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    </Layout>
    // </>
  )
}

const Bego = () => {
  return (
    <Button onPress={() => Alert.alert("ok")}>ok</Button>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    // maxHeight: 250,
    overflow: 'scroll',
    width: '100%',
    // backgroundColor: 'blue',
  },
  safeArea: {
    backgroundColor: 'red',
  }
});


export default Consumptions;