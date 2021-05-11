import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import CustomHeader from "./CustomHeader";

export default function External({ navigation }) {
  const url = navigation.getParam("url");
  const titulo = navigation.getParam("title");
  const isHome = navigation.getParam("ishome");

  //console.log("Valor de la url: " + url);
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} title={titulo} isHome={isHome} />
      <WebView
        source={{
          uri: url,
        }}
      />
    </View>
  );
}
