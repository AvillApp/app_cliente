import React, { useEffect } from "react";
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
} from "native-base";

export default function MisViajes({ navigation }) {
  // const getIdpedido = async () => {
  //   const id_user = await AsyncStorage.getItem("id_user");
  //   const response2 = await fetch(
  //     `${api}PedidosController.php?pedido_user=1&getViajes=1&id=${id_user}`
  //   );
  //   const logs = await response2.json();
  //   setData(logs); // Logs
  // };
  // useEffect(() => {
  //   setInterval(() => {
  //     getIdpedido();
  //   }, 900);
  // }, []);
  return (
    <Container>
      <Header />
      <Content>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#FF9501" }}>
              <Icon active name="airplane" />
            </Button>
          </Left>
          <Body>
            <Text>Airplane Mode</Text>
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#007AFF" }}>
              <Icon active name="wifi" />
            </Button>
          </Left>
          <Body>
            <Text>Wi-Fi</Text>
          </Body>
          <Right>
            <Text>GeekyAnts</Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#007AFF" }}>
              <Icon active name="bluetooth" />
            </Button>
          </Left>
          <Body>
            <Text>Bluetooth</Text>
          </Body>
          <Right>
            <Text>On</Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
      </Content>
    </Container>
  );
}
