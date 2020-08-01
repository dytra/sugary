import React, { useEffect } from 'react';
import { StyleSheet,  } from 'react-native';
import { Divider, Layout, Text, Button, List, ListItem, TopNavigation, TopNavigationAction, Icon, useTheme } from "@ui-kitten/components"

const Consumptions = ({ navigation, state, route, ...props }) => {
  const { consumptions, setConsumptions, handlePressSubmit } = route.params;
  
  const renderItem = ({ item, index }) => {
    return (
      <ListItem title={`${item.id}`} description={`${item.amount}gr`} />
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

  useEffect(() => {

  }, []);


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
        <Text category='h1'>Consumptions</Text>
        <Button status='success' onPress={() => navigation.navigate('Add Consumption', {
          consumptions,
          setConsumptions: setConsumptions,
          handlePressSubmit: handlePressSubmit,
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
    width: '100%',
    // backgroundColor: 'blue',
  },
  safeArea: {
    backgroundColor: 'red',
  }
});


export default Consumptions;