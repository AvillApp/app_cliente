import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { Container } from "native-base";
//import ShareSocial from "../Share";
import CustomHeader from "../CustomHeader";
import Loading from "../../Lib/plug/Loading";
import { ICONOS } from "../../Constans/imagenes";
import AppButton from "../../Lib/plug/AppButton";

export default function Calificar({ navigation }) {
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [error, setError] = useState(false);
  const [Estrellas, setEstrellas] = useState("");
  const [Comentario, setComentario] = useState("");
  // const Direccion = navigation.getParam("Direccion");
  return (
    <Container style={{ flex: 1 }}>
      <CustomHeader
        navigation={navigation}
        title="Calificar Servicio"
        isHome={false}
        isLogin={false}
      />
      <View style={styles.container}>
        <View style={styles.butt}>
          <AppButton title="Calificar" />
        </View>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 50,
    marginLeft: 10,
  },
  logo: {
    marginLeft: 90,
    height: 200,
    width: 200,
  },
});
