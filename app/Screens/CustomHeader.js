import React from "react";
import { Header, Left, Body, Right, Button, Icon, Title } from "native-base";

export default function CustomHeader({ title, navigation, isHome, isLogin }) {
  console.log(isHome);
  return (
    <Header style={{ backgroundColor: "#CCCCCC" }}>
      {isHome && (
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
      )}
      <Body>
        <Title>{title}</Title>
      </Body>
      {!isLogin && (
        <Right>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Right>
      )}
    </Header>
  );
}
