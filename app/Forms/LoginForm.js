import React, { useState } from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  Image,
  ImageBackground,
  Dimensions,
  Text,
} from "react-native";
import axios from "axios";
import { Content, Form, Item, Input, Label, Icon } from "native-base";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppButton from "../Lib/plug/AppButton";
import Loading from "../Lib/plug/Loading";
import ErrorMessage from "../Lib/plug/Error";
import { api } from "../Lib/utils/db";
import { MARCA } from "../Constans/imagenes";

const { height } = Dimensions.get("window");

export default function LoginForm({ navigation }) {
  const [telefono, setTelefono] = useState();
  const [clave, setClave] = useState(""); //
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [error, setError] = useState(false);

  const obtenerUser = async () => {
    const id_user = await AsyncStorage.getItem("id_user");
    const id_pedido = await AsyncStorage.getItem("id_pedido");
    if (id_user) navigation.navigate("app");
    if (id_pedido) navigation.navigate("Estado")

      // if(location){
      //   if (id_user) navigation.navigate("app");
      //   if (id_pedido) navigation.navigate("Estado")
      // }
    
  };
  obtenerUser();


  const Loguear = async (id,nom) => {
    await AsyncStorage.setItem("id_user", id.toString());
    await AsyncStorage.setItem("nombre", nom.toString());
    navigation.navigate("app");
  }

  const autentication = async () => {
    // console.log("Validando2");
    setIsVisibleLoading(true);

   // axios.get('/user?ID=12345')
    axios.get(`${api}personas/buscar/${telefono}?format=json`)
        .then(response => {

          let data;
          let nom;
          response.data.map(dt => {
              data = dt.id;
              nom = dt.name;
          })

          Loguear(data,nom)
          
        }).catch(error=>{
           setError(true);
     })

    setIsVisibleLoading(false);
  };

  const Register = () => {
    navigation.navigate("Register");
  };
  return (
    // <KeyboardAwareScrollView>
    <Content
      ContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={MARCA.FONDO_LOGIN}
        style={{ flex: 1, width: null, height: 900 }}
        resizeMode="cover"
      >
        <View style={styles.centerLogo}>
          <Image source={MARCA.LOGO} style={styles.logo} />
        </View>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label style={{ fontSize: 20, color: "#FFFFFF" }}>
              Ingrese número de teléfono
            </Label>
            <Input
              onChange={(e) => setTelefono(e.nativeEvent.text)}
              style={{ fontSize: 20, color: "#FFFFFF" }}
            />
            <Icon
              type="MaterialCommunityIcons"
              name="cellphone"
              style={{ fontSize: 20, color: "#FFFFFF" }}
            />
          </Item>
        </Form>
      
        <View style={styles.butt}>
           
          <AppButton action={autentication} title="Ingresar" />
        </View>

        <View style={styles.txt}>
          <Text style={styles.txt} onPress={Register}>
            No tengo cuenta, haz clic aquí
          </Text>
        </View>

        <View style={styles.txt}>
          <Text style={styles.txt} 
              onPress={() =>
                navigation.navigate("External2", {
                  url: "https://www.avill.com.co/privacy/",
                  title: "Términos y condiciones",
                  ishome: false,
                })
              }
          >
           Términos y condiciones
          </Text>
        </View>
        <Loading text="Iniciando sesión" isVisible={isVisibleLoading} />
        <ErrorMessage text="Número de teléfono incorrecto" isVisible={error} />
      </ImageBackground>
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
    color: "#FFFFFF",
    alignItems: "center",
    fontSize: 18,
  },
});
