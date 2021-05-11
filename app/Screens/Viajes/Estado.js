import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, AsyncStorage } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { Container, List, ListItem, Thumbnail, Left, Right } from "native-base";
//import PushNotification from "react-native-push-notification";
//import ShareSocial from "../Share";
import CustomHeader from "../CustomHeader";
import Popup from "../../Lib/plug/Popup";
import { ICONOS } from "../../Constans/imagenes";
import { api } from "../../Lib/utils/db";
import axios from "axios";

export default function Estado({ navigation }) {
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [data, setData] = useState();
  const [txt, setTxt] = useState();
  const Direccion = navigation.getParam("Direccion");

  const title = "" + Direccion;

  // Para mostrar los logs y saber el estado del pedido
  const getIdpedido = async () => {
    const id_pedido = await AsyncStorage.getItem("id_pedido");

    if (id_pedido) {
      const id_user = await AsyncStorage.getItem("id_user");
      
      // api/pedidos_acti/<pedido>/</pedido>
      const response2 = await fetch(
        `${api}pedidos_acti/${id_pedido}`
      );
      const logs = await response2.json();
      //console.log(logs)

      setData(logs); // Logs

      // Obtenemos el estado del pedido.

      const infoUser = await fetch(
        `${api}pedidos/buscar/${id_user}?format=json`
      );
      const resUser = await infoUser.json();
      
      //console.log(resUser)
      let estado_ped;
      let placa;
      let precio;
      let photo;
      let conductor;
      let tiempo;
      resUser.map(dt => {
        estado_ped = dt.estado;
        
        //console.log("Valor el vehiculo", dt.vehiculo)

        if(dt.vehiculo!=null){
          placa = dt.vehiculo.placa
          photo = dt.vehiculo.photo
          tiempo = dt.tiempo
          precio = dt.precio
          conductor=dt.vehiculo.persona.name
        }
      })


        if (estado_ped == 5) {
          setIsVisibleLoading(true);
          //setPrecio(estado_pedido.precio); // Conductor disponible
          setTxt(
            "¿Aceptar pedido? \n \n Valor:" +
              precio +
              "\n Placa: " +
              placa +
              "\n Tiempo: " +
              tiempo +
              "\n Conductor: " +
              conductor
          );
        } else if (estado_ped == 6) {
          await AsyncStorage.removeItem("id_pedido");
          // Viaje terminado
          navigation.navigate("Inicio");
        } else if (estado_ped == 4) {
          await AsyncStorage.removeItem("id_pedido");
          // Viaje cancelado.
          navigation.navigate("Inicio");
        } else setIsVisibleLoading(false);
    }
    

  };

  const HandleCalificar = () => {
    navigation.navigate("Calificar", { Idpedido });
  };

  // Para actualizar el estado de lo que va ocurriendo en el pedido.
  useEffect(() => {
    setInterval(() => {
      getIdpedido();
    }, 900);
  }, []);

  return (
    <Container style={{ flex: 1 }}>
      <CustomHeader
        navigation={navigation}
        title={title}
        isHome={false}
        isLogin={false}
      />
      {/* <Popup text="¿Aceptar pedido?" isVisible={isVisibleLoading} /> */}
      <View>
        <Image source={ICONOS.LOADING} style={styles.logo} resizeMode="cover" />
      </View>

      <View style={styles.container}>
        <Popup text={txt} isVisible={isVisibleLoading} />
        <Timeline
          data={data}
          circleSize={20}
          circleColor="rgb(45,156,219)"
          lineColor="rgb(45,156,219)"
          timeContainerStyle={{ minWidth: 52, marginTop: 1 }}
          timeStyle={{
            textAlign: "center",
            backgroundColor: "#ff9797",
            color: "white",
            padding: 5,
            borderRadius: 13,
          }}
          descriptionStyle={{ color: "gray" }}
          options={{
            style: { paddingTop: 10 },
          }}
        />
        <View style={styles.conductor}>
          <List>
            <ListItem avatar>
              {/* <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWC-6XDDB_jWPl8YFNKwWyZJj7Shyfrawao5xGuPw8CbLkMPuo&usqp=CAU",
                  }}
                  style={styles.logo}
                />
              </Left> */}
              {/* <Text>Placa {"\n"}153E</Text>
              <Text></Text>
              <TouchableHighlight
                onPress={() => {
                  Linking.openURL("tel:3143405335");
                }}
              >
                <Image
                  source={{
                    uri:
                      "https://image.freepik.com/vector-gratis/icono-telefono-boton-miniatura_24911-30424.jpg",
                  }}
                  style={styles.logo}
                />
              </TouchableHighlight>
              <TouchableHighlight onPress={HandleCalificar}>
                <Image
                  source={{
                    uri:
                      "https://previews.123rf.com/images/yulyashka/yulyashka1705/yulyashka170500061/78013894-icono-de-satisfacci%C3%B3n-del-cliente-concepto-de-negocio-y-finanzas.jpg",
                  }}
                  style={styles.logo}
                />
              </TouchableHighlight>
              <Right>
                <Text note>LLega {"\n"}3:43 pm</Text>
              </Right> */}
            </ListItem>
          </List>
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
    marginLeft: 10,
  },
  logo: {
    height: 64,
    width: 64,
  },
  conductor: {
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
});
