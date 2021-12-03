import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { Text, List, ListItem } from "native-base";
import { MARCA } from "../Constans/imagenes";
import Loading from "../Lib/plug/Loading";

export default function SideMenu({ navigation }) {
  const [name_user, setNameuser] = useState("");
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const ObtenerInfo = async () => {
    const user = await AsyncStorage.getItem("nombre");
    setNameuser(user);
  };

  //   const SearchVersion = async () => {
  //     setIsVisibleLoading(true);

  //     const id_user = await AsyncStorage.getItem("id_user");

  //     const response = await fetch(
  //       `${api}?g_vers_app=1&version_user=1&id_user=${id_user}`
  //     );
  //     const res = await response.json();
  //     //console.log(JSON.stringify(response));

  //     if (res.estado === "new_update") {
  //       // console.log("Actualice la versión nueva");
  //       Alert.alert(
  //         "Nueva versión disponible",
  //         "Fecha: " + res.fecha,
  //         [
  //           {
  //             text: "Actualizar",
  //             onPress: () => Linking.openURL(res.url),
  //           },
  //           {
  //             text: "Cancelar",
  //             onPress: () => console.log("Cancel Pressed"),
  //             style: "cancel",
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //     } else if (res.estado === "update") {
  //       console.log("Actualizado");
  //       Alert.alert(
  //         "Estado de aplicación",
  //         "Estás con la última versión.",
  //         [{ text: "OK" }],
  //         { cancelable: false }
  //       );
  //     } else {
  //       console.log("Error buscando versión de app");
  //     }
  //     //console.log(res);
  //     setIsVisibleLoading(false);
  //   };

  const CerraCuenta = async () => {
    const id_user = await AsyncStorage.getItem("id_user");
    const remove = await AsyncStorage.removeItem("id_user");
    const id_user2 = await AsyncStorage.getItem("id_user");
    const id_pedido = await AsyncStorage.removeItem("id_pedido");

    if (!id_user2) navigation.navigate("auth");
  };

  useEffect(() => {
    ObtenerInfo();
  }, [name_user]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ height: 150, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={MARCA.LOGO}
          style={{ height: 120, width: 120, borderRadius: 60 }}
        />
      </View>
      <Text style={styles.profile}>{name_user}</Text>
      <ScrollView>
        <List style={styles.lista}>
          {/* <ListItem
            onPress={() =>
              navigation.navigate("External", {
                url: "http://www.yomecuido.com.co/web/covid-19/",
                title: "Covid19",
              })
            }
          >
            <Text>Covid19</Text>
          </ListItem> */}
          {/* <ListItem
            onPress={() =>
              navigation.navigate("External", {
                url: "http://www.yomecuido.com.co/web/recomendaciones/",
                title: "Recomendaciones",
              })
            }
          >
            <Text>Recomendaciones</Text>
          </ListItem> */}
          <ListItem
            onPress={() =>
              navigation.navigate("External", {
                url: "https://www.avill.com.co/ayuda/",
                title: "Ayuda",
                ishome: true,
              })
            }
          >
            <Text>Ayuda</Text>
          </ListItem>
          <ListItem
            onPress={() =>
              navigation.navigate("External", {
                url: "https://www.avill.com.co/privacy/",
                title: "Términos y condiciones",
                ishome: true,
              })
            }
          >
            <Text>Términos y condiciones</Text>
          </ListItem>

          <ListItem
            onPress={() =>
              navigation.navigate("External", {
                url: "https://www.avill.com.co/acerca-de/",
                title: "Acerca de",
                ishome: true,
              })
            }
          >
            <Text>Acerca de</Text>
          </ListItem>
          {/* <ListItem onPress={SearchVersion}>
            <Text>Buscar actualización</Text>
          </ListItem> */}
        </List>
      </ScrollView>
      <List>
        <ListItem noBorder onPress={CerraCuenta}>
          <Text>Salir</Text>
        </ListItem>
      </List>
      <Loading text="Buscando" isVisible={isVisibleLoading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lista: {
    color: "blue",
  },
  profile: {
    fontSize: 18,
    textAlign: "center",
    color: "#287AFF",
    marginBottom: 20,
  },
});
