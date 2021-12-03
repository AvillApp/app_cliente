import React, { useState } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Content, Form, Item, Input, Label, Icon } from "native-base";
import Push from "../Screens/push";
import { MARCA } from "../Constans/imagenes";

const { height } = Dimensions.get("window");

export default function PortalForm({ navigation }) {
  const [Emision, setEmision] = useState();
  const [Direccion, setDireccion] = useState();

  const NuevoPedido = () => {
    const dir = Direccion;
    const emi = Emision;
    setDireccion("");
    setEmision("");

    navigation.navigate("Confirmar", {
      emision: emi,
      direccion: dir,
    });
  };
  return (
    // <KeyboardAwareScrollView>
    <Content
      ContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form style={styles.form}>
        <Item floatingLabel>
          <Label style={{ fontSize: 15 }}>Donde estás?</Label>
          <Input
            value={Emision}
            onChange={(e) => setEmision(e.nativeEvent.text)}
            style={{ fontSize: 20 }}
          />
        </Item>
        <Item floatingLabel>
          <Label style={{ fontSize: 15 }}>Hacia donde vamos?</Label>
          <Input
            value={Direccion}
            onChange={(e) => setDireccion(e.nativeEvent.text)}
            style={{ fontSize: 20 }}
          />
          <Icon
            type="MaterialCommunityIcons"
            name="magnify"
            onPress={NuevoPedido}
            style={{ fontSize: 30, color: "#E9C924" }}
          />
        </Item>
      </Form>
      <View>
        <Image source={MARCA.FONDO_MAPA} style={styles.logo} />
      </View>
      {/* <Loading text="Iniciando sesión" isVisible={isVisibleLoading} />
      <ErrorMessage text="Número de teléfono incorrecto" isVisible={error} /> */}
    </Content>
  );
}
const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
  form: {
    marginTop: 40,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 90,
    marginTop: 100,
    height: 200,
    width: 200,
  },

  butt: {
    marginTop: 30,
    alignItems: "center",
    color: "#FFFFFF",
    fontSize: 15,
  },
  txt: {
    marginTop: 20,
    color: "#FFFFFF",
    alignItems: "center",
    fontSize: 18,
  },
});
