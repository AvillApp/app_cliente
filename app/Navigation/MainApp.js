import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import authStack from "./AuthStack";
import appDrawer from "./AppDrawer";

const MainApp = createSwitchNavigator(
  {
    app: appDrawer,
    auth: authStack,
  },
  {
    initialRouteName: "auth",
  }
);
export default createAppContainer(MainApp);
