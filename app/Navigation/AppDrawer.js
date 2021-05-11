import React from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import SideMenu from "../Screens/SideMenu";
import MainTabs from "./MainTabs";
import { navOptionHandler } from "./Stacks";
import Settings from "../Screens/Settings";
import Profile from "../Screens/Profile";
import External from "../Screens/External";

const MainStack = createStackNavigator(
  {
    Home: {
      screen: MainTabs,
      navigationOptions: navOptionHandler,
    },
    Settings: {
      screen: Settings,
      navigationOptions: navOptionHandler,
    },
    Profile: {
      screen: Profile,
      navigationOptions: navOptionHandler,
    },
    External: {
      screen: External,
      navigationOptions: navOptionHandler,
    },
  },
  {
    initialRouteName: "Home",
  }
);

const appDrawer = createDrawerNavigator(
  {
    drawer: MainStack,
  },
  {
    drawerPosition: "right", // Positición a la derecha.
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get("window").width * (3 / 4),
  }
);

export default appDrawer;
