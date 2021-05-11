import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../Screens/Account/Login";
import Register from "../Screens/Account/Register";
import External from "../Screens/External";
//import Aviso from "../Screens/Account/Aviso";
import { navOptionHandler } from "./Stacks";
// import Home from "../Screens/Home";

const authStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: navOptionHandler,
    },
    Register: {
      screen: Register,
      navigationOptions: navOptionHandler,
    },
    External2: {
      screen: External,
      navigationOptions: navOptionHandler,
    },
    /*Aviso: {
      screen: Aviso,
      navigationOptions: navOptionHandler,
    },*/
    
  },
  { initialRouteName: "Login" }
);

export default authStack;
