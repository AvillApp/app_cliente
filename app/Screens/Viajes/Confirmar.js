import React from "react";
import { Container } from "native-base";

import ConfirmarForm from "../../Forms/ConfirmarForm";
import CustomHeader from "../CustomHeader";

export default function Confirmar({ navigation }) {
  const direccionGet = navigation.getParam("direccion");
  const emisionGet = navigation.getParam("emision");
  return (
    <Container style={{ flex: 2 }}>
      <CustomHeader
        navigation={navigation}
        title="Confirmar viaje"
        isHome={false}
        isLogin={false}
      />
      <ConfirmarForm
        navigation={navigation}
        emision={emisionGet}
        direccion={direccionGet}
      />
    </Container>
  );
}
