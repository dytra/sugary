import React from "react";
import { Alert } from "react-native";
import { Button } from "@ui-kitten/components";
const Boba = () => {
  return (
    <Button onPress={() => Alert.alert("okokok")}>
      Bob
    </Button>
  )
}

export default Boba;