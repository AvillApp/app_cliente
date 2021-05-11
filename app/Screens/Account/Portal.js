import React from "react";
import { Container } from "native-base";

import PortalForm from "../../Forms/PortalForm";
import CustomHeader from "../CustomHeader";

export default function Portal({ navigation }) {
  return (
    <Container style={{ flex: 2 }}>
      <CustomHeader
        navigation={navigation}
        title="¿A donde vamos?"
        isHome={false}
        isLogin={false}
      />
      <PortalForm navigation={navigation} />
    </Container>
  );
}
