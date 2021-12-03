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
import { api } from "../../Lib/utils/db";
import CustomHeader from "../CustomHeader";

export default function MisViajes({ navigation }) {
  const [data, setData] = useState([]);
  const [retri, setRetri] = useState(true);

  const getIdpedido = async () => {
    const id_user = await AsyncStorage.getItem("id_user");

    const infoUser = await fetch(
      `${api}orders/?account=${id_user}&format=json`
    );
    const resUser = await infoUser.json();
    setData(resUser); // Logs
  };

  useEffect(() => {
    if (retri) {
      getIdpedido();
      setRetri(false);
    }
    //setInterval(() => {}, 5000);
  }, []);

  return (
    <Container>
      <CustomHeader
        navigation={navigation}
        title="Mis Órdenes"
        isHome={false}
        isLogin={false}
      />
      <Content>
        {data.map((datos) => (
          <ListItem>
            <Body>
              <Text>{datos.destino}</Text>
              <Text>Costo: {datos.precio}</Text>
              <Text>Tiempo: {datos.solicitud}</Text>
            </Body>
            <Right>
              <Text>{datos.estado}</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        ))}
      </Content>
    </Container>
  );
}
