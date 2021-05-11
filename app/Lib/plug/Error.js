import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default ErrorMessage = ({ text, isVisible }) => {
  if (isVisible) {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>{text}</Text>
      </View>
    );
  } else {
    return <View></View>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    marginTop: 10,
    fontSize: 21,
    width: "100%",
    textAlign: "center",
    color: "white",
    backgroundColor: "red",
  },
});
