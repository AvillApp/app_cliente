import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import {
  Container,
  Content,
  ListItem,
  Text,
  Icon,
  Body,
  Right,
} from "native-base";
import { Badge } from "react-native-elements";
import API from "../../Lib/utils/db";
import CustomHeader from "../CustomHeader";

export default function MisViajes({ navigation }) {
  const [data, setData] = useState([]);
  const [retri, setRetri] = useState(true);

  const getIdpedido = async () => {
    const id_user = await AsyncStorage.getItem("id_user");
    const response = await API.get(`orders/?account=${id_user}&format=json`);
    const resUser = response.data;
    setData(resUser); // Logs
  };

  useEffect(() => {
    if (retri) {
      getIdpedido();
      setRetri(false);
    }
    //setInterval(() => {}, 5000);
  }, []);

  const HandleSeguimiento = (id) => {
    //console.log("Hizo clic");
    navigation.navigate("Estado", {
      Pedido: id,
    });
  };

  return (
    <Container>
      <CustomHeader
        navigation={navigation}
        title="Mis viajes"
        isHome={false}
        isLogin={false}
      />
      <Content>
        {data.map((datos) => (
          <ListItem key={datos.id} onPress={() => HandleSeguimiento(datos.id)}>
            <Body>
              <Text>Destino: {datos.destino}</Text>
              <Text>Costo: {datos.precio}</Text>
              <Text>Fecha: {datos.modified}</Text>
            </Body>
            <Right>
              <Right>
                {datos.estado == 7 && (
                  <Badge status="success" value="Finalizado" />
                )}
                {datos.estado == 8 && (
                  <Badge status="error" value="Cancelado" />
                )}
                {(datos.estado == 9 || datos.estado == 3) && (
                  <Badge status="warning" value="En espera" />
                )}
                {datos.estado == 6 && (
                  <Badge status="primary" value="En ruta" />
                )}
                {datos.estado == 4 && (
                  <Badge status="primary" value="Confirmado" />
                )}
                {datos.estado == 5 && (
                  <Badge status="primary" value="En camino" />
                )}
                {/* <Text>{datos.estado}</Text> */}
              </Right>
            </Right>
          </ListItem>
        ))}
      </Content>
    </Container>
  );
}
