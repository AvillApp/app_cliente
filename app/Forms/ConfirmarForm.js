import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage, Dimensions } from "react-native";
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Textarea,
  Picker,
} from "native-base";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";
import AppButton from "../Lib/plug/AppButton";
import Loading from "../Lib/plug/Loading";
import ErrorMessage from "../Lib/plug/Error";
import { api } from "../Lib/utils/db";
import API from "../Lib/utils/db";
import axios from "axios";
//import * as Location from 'expo-location'
//import Constants from 'expo-constants'
import { MARCA } from "../Constans/imagenes";
import { Alert } from "react-native";

const { height } = Dimensions.get("window");

export default function ConfirmarForm({ navigation, direccion, emision }) {
  const [indicacion, setIndicacion] = useState("");
  const [telefono, setTelefono] = useState("");

  const [Direccion, setDireccion] = useState(direccion);
  const [Emision, setEmision] = useState(emision);

  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [error, setError] = useState(false);

  // Para obtener la localización
  const [location, setLocation] = useState(null);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const [tiposervicio, setTipoServicio] = useState();
  const [listTipoServ, setListTipoServ] = useState([]);

  const [servicio, setServicio] = useState();
  const [listServicio, setListservicio] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await API.get(`typeservices?format=json`);
      setListTipoServ(response.data);
    };
    fetch();
    // buscarLocation()
  }, []);

  const handleTipo = async (value) => {
    setTipoServicio(value);

    const fetch = async () => {
      const response = await API.get(
        `services/?type_servicios=${value}&format=json`
      );
      setListservicio(response.data);
    };
    fetch();
  };

  // const ObtenerPedido = async (id) => {
  //   const response = await API.get(`orders/${id}/?format=json`);
  //   // const infoUser = await fetch(`${api}orders/${id}/?format=json`);
  //   //const resUser = await infoUser.json();

  //   let data = response.data.id;
  //   response.data.map((dt) => {
  //     data = dt.id;
  //   });
  //   //console.log("id_pedido: ", data);

  //   await AsyncStorage.setItem("id_pedido", data.toString());

  //   // Enviamos primera información
  //   const titulo = "Solicitud de servicio seguro ";
  //   const descripcion = "Haz solicitado un(a) " + servicio;

  //   const logs_pedido = {
  //     title: titulo,
  //     description: descripcion,
  //     pedido: parseInt(data),
  //     realizado_by: parseInt(id),
  //   };

  //   const response2 = await API.post(`activiorders/`, logs_pedido);
  //   navigation.navigate("Estado", {
  //     Direccion: Direccion,
  //     Pedido: data,
  //   });

  //   // axios
  //   //   .post(`${api}activiorders/`, logs_pedido)
  //   //   .then((response) => {
  //   //     navigation.navigate("Estado", {
  //   //       Direccion: Direccion,
  //   //       Pedido: data,
  //   //     });
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   });
  // };

  const NotifiyPush = async (tokenPush, body) => {
    // console.log("Ingresó aquí");
    // console.log("Token del conductor: ", tokenPush);
    const message = {
      to: tokenPush,
      sound: "default",
      title: "Avill",
      body: body,
      data: { someData: "goes here" },
    };
    console.log("enviando msg: ", message);

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  const NuevoPedido = async () => {
    if (Direccion && indicacion && telefono) {
      setIsVisibleLoading(true);
      //if (telefono === "") setTelefono(0);
      const id_user = await AsyncStorage.getItem("id_user");
      // const token_push = await AsyncStorage.getItem("token_push");

      const pedido = {
        emision: Emision,
        destino: Direccion,
        indicacion: indicacion,
        longitude: longitude,
        latitude: latitude,
        telealt: parseInt(telefono),
        estado: 3,
        account: parseInt(id_user),
        solicitud: servicio,
      };
      //console.log(pedido);
      const response2 = await API.post(`orders/`, pedido);
      //console.log(response2.data);
      //await ObtenerPedido(id_user);

      await AsyncStorage.setItem("id_pedido", response2.data.id.toString());

      // Enviamos primera información
      const titulo = "Solicitud de servicio seguro ";
      const descripcion = "Haz solicitado un(a) " + servicio;

      const logs_pedido = {
        title: titulo,
        description: descripcion,
        pedido: parseInt(response2.data.id),
        realizado_by: parseInt(id_user),
      };
      setIsVisibleLoading(false);
      const response3 = await API.post(`activiorders/`, logs_pedido);

      // Mandar ordenes a los conductores solo activos o disponibles
      const response4 = await API.get(
        `accounts/?type_persona=3&estado=1&format=json`
      );
      //console.log(response4.data);
      response4.data.map((dt) => {
        if (dt.tokenPush !== "")
          NotifiyPush(dt.tokenPush, "Hay un nuevo pedido en espera");
      });
      navigation.navigate("Estado", {
        Direccion: Direccion,
        Pedido: response2.data.id,
      });
    } else setError(true);
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
          <Label style={{ fontSize: 15 }}>(*)Desde</Label>
          <Input
            value={Emision}
            onChange={(e) => setEmision(e.nativeEvent.text)}
            style={{ fontSize: 15 }}
          />
          <Icon
            type="MaterialCommunityIcons"
            name="directions"
            style={{ fontSize: 20, color: "#E9C924" }}
          />
        </Item>
        <Item floatingLabel>
          <Label style={{ fontSize: 15 }}>(*)Hasta</Label>
          <Input
            value={Direccion}
            onChange={(e) => setDireccion(e.nativeEvent.text)}
            style={{ fontSize: 15 }}
          />
          <Icon
            type="MaterialCommunityIcons"
            name="directions"
            style={{ fontSize: 20, color: "#E9C924" }}
          />
        </Item>
        <Item floatingLabel>
          <Label style={{ fontSize: 15 }}>Teléfono alternativo</Label>
          <Input
            value={telefono}
            onChange={(e) => setTelefono(e.nativeEvent.text)}
            style={{ fontSize: 15 }}
            placeholder="Dejar en blanco, utilizaremos el principal"
          />
          <Icon
            type="MaterialCommunityIcons"
            name="cellphone"
            style={{ fontSize: 20, color: "#E9C924" }}
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
        <Label style={{ marginLeft: 10, fontSize: 15 }}>Tipo de Servicio</Label>

        <Picker
          mode="dropdown"
          style={{ marginLeft: 10, width: 350 }}
          selectedValue={tiposervicio}
          onValueChange={handleTipo}
        >
          {listTipoServ.map((serv) => (
            <Picker.Item key={serv.id} label={serv.nombre} value={serv.id} />
          ))}
        </Picker>

        <Label style={{ marginLeft: 10, fontSize: 15 }}>
          Seleccione el servicio
        </Label>
        <Picker
          mode="dropdown"
          style={{ marginLeft: 10, width: 350 }}
          selectedValue={servicio}
          onValueChange={(itemValue, itemIndex) => setServicio(itemValue)}
        >
          {listServicio.map((datos2) => (
            <Picker.Item
              key={datos2.id}
              label={datos2.nombre}
              value={datos2.nombre}
            />
          ))}
        </Picker>
      </Form>
      <View style={styles.butt}>
        <AppButton action={NuevoPedido} title="Quiero el servicio" />
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
