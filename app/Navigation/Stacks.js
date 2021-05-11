import { createStackNavigator } from "react-navigation-stack";
import Viajes from "../Screens/Viajes";
import Portal from "../Screens/Account/Portal";
import Confirmar from "../Screens/Viajes/Confirmar";
import Estado from "../Screens/Viajes/Estado";
import Calificar from "../Screens/Viajes/Calificar";

export const navOptionHandler = (navigation) => ({
  header: null,
});

export const PortalStack = createStackNavigator({
  Inicio: {
    screen: Portal,
    navigationOptions: navOptionHandler,
  },
  Confirmar: {
    screen: Confirmar,
    navigationOptions: navOptionHandler,
  },
  Estado: {
    screen: Estado,
    navigationOptions: navOptionHandler,
  },
  Calificar: {
    screen: Calificar,
    navigationOptions: navOptionHandler,
  },
});

export const ViajesStack = createStackNavigator({
  Viajes: {
    screen: Viajes,
    navigationOptions: navOptionHandler,
  },
  Estado: {
    screen: Estado,
    navigationOptions: navOptionHandler,
  },
});
