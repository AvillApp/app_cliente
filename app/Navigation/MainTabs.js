import * as React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { PortalStack, ViajesStack } from "./Stacks";
import { Icon } from "native-base";

const MainTabs = createBottomTabNavigator(
  {
    Portal: {
      screen: PortalStack,
      navigationOptions: {
        tabBarLabel: "Inicio",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="MaterialCommunityIcons"
            name="home"
            style={{ fontSize: 30, color: "#008f39" }}
          />
        ),
      },
    },
    Viajes: {
      screen: ViajesStack,
      navigationOptions: {
        tabBarLabel: "Mis Viajes",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="MaterialCommunityIcons"
            name="map-search"
            style={{ fontSize: 30, color: "#008f39" }}
          />
        ),
      },
    },
    // Cases: {
    //   screen: CasesStack,
    //   navigationOptions: {
    //     tabBarLabel: "Casos",
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon
    //         type="MaterialCommunityIcons"
    //         name="map-search"
    //         style={{ fontSize: 30, color: "#287AFF" }}
    //       />
    //     ),
    //   },
    // },

    // Chat: {
    //   screen: ChatStack,
    //   navigationOptions: {
    //     tabBarLabel: "Chat",
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon
    //         type="MaterialCommunityIcons"
    //         name="chat"
    //         style={{ fontSize: 30, color: "#287AFF" }}
    //       />
    //     ),
    //   },
    // },
  },
  {
    initialRouteName: "Portal",
  }
);
export default MainTabs;
