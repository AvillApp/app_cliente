import React, { useEffect } from "react";
import { 
  View, 
  StyleSheet, 
  Image, 
  Dimensions, 
  Text, 
  AsyncStorage 
} from "react-native";
import { Content, Form, Item, Input, Label, Icon } from "native-base";
import * as Location from 'expo-location'
import AppButton from "../Lib/plug/AppButton";
import Constants from 'expo-constants'

import { MARCA } from "../Constans/imagenes";

const { height } = Dimensions.get("window");

export default function AvisoForm({ navigation }) {

    const obtenerLocation= async () => {
        const location = await AsyncStorage.getItem("location");

        console.log("Dato de location: ", location)
        if (location) navigation.navigate("app");
      };
    

    const buscarLocation = async () => {
      //console.log("Dio clic aqui");
        const { status } = await Location.requestPermissionsAsync()
        if (status !== 'granted'){
          return Alert.alert('No tenemos los permisos necesarios para acceder a la localizacion')
        }
        const Locat = await Location.getCurrentPositionAsync({})
        await AsyncStorage.setItem("location", Locat);
      }

      const CerraCuenta = async () => {
        console.log("Dio Clic")
        const id_user = await AsyncStorage.getItem("id_user");
        const remove = await AsyncStorage.removeItem("id_user");
        const id_user2 = await AsyncStorage.getItem("id_user");
        const id_pedido = await AsyncStorage.removeItem("id_pedido");
        console.log(id_user2)

        if (!id_user2){
          console.log("Esta aqui");
          navigation.navigate("Login");
        } else
        console.log("Esta acá")
      };
    
     /* useEffect(() => {
        obtenerLocation()
      }, [])*/

  return (
    // <KeyboardAwareScrollView>
    <Content
      ContainerStyle={{
        justifyContent: "justify",
        alignItems: "center",
      }}
    >
     
        <Text style={styles.txt}>
            Avill necesita permisos de tu ubicación para poder llegar a tus destinos,
            además es necesario saber qué conductores estarán más cerca de ti y brindarte
            una rápida respuesta, incluso cuando la aplicación está cerrada o no está en uso,
            así estarás más informado donde viene tu servicio y cuanto tiempo demora en llegar.
        </Text>
      <View style={styles.butt}>
          <AppButton action={buscarLocation} title="Continuar" />
        </View>
        <View style={styles.butt}>
        <AppButton action={CerraCuenta} title="Salir" />
      </View>
    </Content>
  );
}
const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
  form: {
    marginTop: 40,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 90,
    marginTop: 100,
    height: 200,
    width: 200,
  },

  butt: {
    marginTop: 30,
    alignItems: "center",
    color: "#FFFFFF",
    fontSize: 15,
  },
  txt: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
  },
});
