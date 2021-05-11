import React from "react";
import { Container } from "native-base";

import LoginForm from "../../Forms/LoginForm";
import CustomHeader from "../CustomHeader";

export default function Login({ navigation }) {
  return (
    <Container style={{ flex: 2 }}>
      <LoginForm navigation={navigation} />
    </Container>
  );
}
