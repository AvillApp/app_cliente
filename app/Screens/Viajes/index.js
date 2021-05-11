import React, { useState } from "react";
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
  const getIdpedido = async () => {
    const id_user = await AsyncStorage.getItem("id_user");


    const infoUser = await fetch(
      `${api}pedidos/user/${id_user}?format=json`
    );
    const resUser = await infoUser.json();
    setData(resUser); // Logs
  
  };
  getIdpedido();
  
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
          <ListItem>
            <Body>
              <Text>{datos.destino}</Text>
              <Text>Costo: {datos.precio}</Text>
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
