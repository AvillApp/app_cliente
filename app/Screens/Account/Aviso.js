import React from "react";
import { Container } from "native-base";

import AvisoForm from "../../Forms/AvisoForm";
import CustomHeader from "../CustomHeader";

export default function Aviso({ navigation }) {
  return (
    <Container style={{ flex: 2 }}>
      <CustomHeader
        navigation={navigation}
        title="Aviso"
        isHome={false}
        isLogin={true}
      />
        <AvisoForm navigation={navigation} />
    </Container>
  );
}
