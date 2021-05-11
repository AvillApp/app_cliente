import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage, Dimensions } from "react-native";
import { Content, Form, Item, Input, Label, Icon, Textarea } from "native-base";
import AppButton from "../Lib/plug/AppButton";
import Loading from "../Lib/plug/Loading";
import ErrorMessage from "../Lib/plug/Error";
import { api } from "../Lib/utils/db";
import { MARCA } from "../Constans/imagenes";

const { height } = Dimensions.get("window");

export default function CalificarForm({ navigation, direccion }) {
  const [Comentario, setComentario] = useState("");
  const [Estrella, setEstrella] = useState(1);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [error, setError] = useState(false);

  const obtenerUser = async () => {
    const id_user = await AsyncStorage.getItem("id_user");
  };
  obtenerUser();

  const EnviarCalificacion = async () => {
    // setIsVisibleLoading(true);
    // const response = await fetch(
    //   `${api}?pedido=1&save_pedido=1&direccion=${direccion}&indicacion=${indicacion}`
    // );
    // const res = await response.json();

    navigation.navigate("Estado", { Direccion: Direccion });

    if (res.estado == "ok") {
      //   const infoUser = await fetch(
      //     `${api}?users=1&infoUser=1&telefono=${telefono}`
      //   );
      //   const resUser = await infoUser.json();
      //console.log(resUser.id);
      // // Consultamos el id
      // await AsyncStorage.setItem("id_user", resUser.id);
      //await AsyncStorage.setItem("nombre", resUser.nombre);
      // await AsyncStorage.setItem("apellido", resUser.apellido);
      //consolo.log("id del usaurio logueado: " + id_user);
      //navigation.navigate("Estado");
    } else {
      setError(true);
    }
    setIsVisibleLoading(false);
  };
  return (
    <Content
      ContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form style={styles.form}>
        <Item floatingLabel>
          <Label style={{ fontSize: 15 }}>Añade un comentario</Label>
          <Input
            value={Comentario}
            onChange={(e) => setComentario(e.nativeEvent.text)}
            style={{ fontSize: 15 }}
          />
          <Icon
            type="MaterialCommunityIcons"
            name="card-search-outline"
            style={{ fontSize: 15, color: "#E9C924" }}
          />
        </Item>

        <Textarea
          rowSpan={5}
          style={{ fontSize: 15 }}
          bordered
          placeholder="¿Cómo  podemos llegar?"
          value={indicacion}
          onChange={(e) => setIndicacion(e.nativeEvent.text)}
        />
      </Form>
      <View style={styles.butt}>
        <AppButton action={NuevoPedido} title="Quiero una moto" />
      </View>
      <Loading text="Buscando Rapi Segura" isVisible={isVisibleLoading} />
      <ErrorMessage
        text="Problema interno, intenta de nuevo"
        isVisible={error}
      />
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
