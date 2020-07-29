import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Layout, Text, Button, List, ListItem } from "@ui-kitten/components"
const Consumptions = ({ navigation, state, route }) => {
  const { consumptions, setConsumptions, handlePressSubmit } = route.params;

  const data = new Array(8).fill({
    title: 'Item',
  });
  const renderItem = ({ item, index }) => {
    // console.log(item);
    return (
      // <ListItem title={`${item.id} ${index + 1}`} />
      <ListItem title={`${item.id}`} description={`${item.amount}`} />
    )
  }

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
      <Text category='h1'>Consumptions</Text>
      <Button status='success' onPress={() => navigation.navigate('Add Consumption', {
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
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    maxHeight: 250,
    width: '100%',
    // backgroundColor: 'blue',
  },
});


export default Consumptions;