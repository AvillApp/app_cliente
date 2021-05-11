import React from "react";
import { View } from "react-native";
import { Container, Header, Content, Button, Text } from "native-base";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { Dimensions } from "react-native";

export default AppButton = ({ action, title }) => {
  const theme = "success";
  return (
    <Button onPress={action} warning>
      <Text>{title}</Text>
    </Button>
  );
};
