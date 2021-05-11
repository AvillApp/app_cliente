import React from "react";
import { View } from "react-native";
import { Button, Text } from "native-base";
import CustomHeader from "./CustomHeader";

export default function Profile({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} title="Profile" isHome={true} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
        <Button light>
          <Text>Profile</Text>
        </Button>
      </View>
    </View>
  );
}
