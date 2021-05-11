import React from "react";
import {
  Share,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
} from "react-native";
import { ICONOS } from "../../Constans/imagenes";

export default ShareSocial = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Te invito a que instales YoMeCuido, es genial puedo hablar con un médico inclusive",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.contenido}>
      <TouchableHighlight onPress={onShare}>
        <Image style={styles.tinyLogo} source={ICONOS.SHARE} />
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  tinyLogo: {
    width: 60,
    height: 60,
    marginStart: 50,
  },
  contenido: {
    marginTop: 50,
    marginLeft: 100,
  },
});
