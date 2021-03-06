import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, AsyncStorage } from "react-native";
import { Container, Text, Picker } from "native-base";
import CustomHeader from "../CustomHeader";
import Popup from "../../Lib/plug/Popup";
import API from "../../Lib/utils/db";
import StepIndicator from "react-native-step-indicator";
import { Avatar, List } from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-ratings";
import Calificar from "./Calificar";

export default function Estado({ navigation }) {
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [txt, setTxt] = useState();
  const id_pedido = navigation.getParam("Pedido");

  const [infoViaje, setInfoViaje] = useState({
    creado: "",
    direccion: "",
    observacion: "",
    telefono: "",
    precio: "",
    id: "",
  });
  const [conductor, setConductor] = useState({
    nombre: "",
    placa: "",
    photo: "",
    tiempo: "",
    tokenPush: "",
    id: "",
  });
  const [seguimiento, setSeguimiento] = useState(1); // Estado en espera
  const [searchInfo, setSearchInfo] = useState(true);
  const [searchSegui, setSearchSegui] = useState(true);

  //const title = "" + Direccion;
  const title = "Seguimiento de viaje";
  //console.log("Id de Pedido: ", navigation.getParam("Pedido"));

  const infoPedido = async (id) => {
    const response = await API.get(`orders/${id}/?format=json`);
    return response.data;
  };
  const [seguiEstado, setSeguiEstado] = useState();
  const Changed2Estado = async (est, conductor) => {
    setSeguiEstado(est);
    const pedido_change = {
      estado: est,
    };
    // console.log(pedido_change);
    //console.log("token del conductor2: ", conductor.tokenPush);
    await API.put(`ordersup/${id_pedido}/`, pedido_change);
    await API.put(`accounts/${conductor}/`, {
      estado: 1,
    });

    NotifiyPush(conductor.tokenPush, "El cliente ha confirmado tu viaje!");
    //console.log("resultado: ", response.data);
  };

  const NotifiyPush = async (tokenPush, body) => {
    // console.log("Ingres?? aqu??");
    // console.log("Token del conductor: ", tokenPush);
    const message = {
      to: tokenPush,
      sound: "default",
      title: "Avill",
      body: body,
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  // Para mostrar los logs y saber el estado del pedido
  const getInfo = async () => {
    //const id_pedido = await AsyncStorage.getItem("id_pedido");

    if (id_pedido) {
      const resUser = await infoPedido(id_pedido);

      if (infoViaje.creado === "") {
        setInfoViaje({
          creado: resUser.created,
          direccion: resUser.destino,
          observacion: resUser.indicacion,
          telefono: resUser.telealt,
          precio: resUser.precio,
          id: resUser.account,
        });
      }
      if (resUser.vehiculo.persona.name !== "") {
        if (conductor.nombre === "") {
          setConductor({
            nombre:
              resUser.vehiculo.persona.name +
              " " +
              resUser.vehiculo.persona.last_name,
            placa: resUser.vehiculo.placa,
            photo: resUser.vehiculo.persona.photo.photo,
            tiempo: resUser.tiempo,
            tokenPush: resUser.vehiculo.persona.tokenPush,
            id: resUser.vehiculo.persona.id,
          });
          setSearchInfo(false);
        }
      }

      if (resUser.estado === 7 || resUser.estado === 8) {
        // Finalizado o cancelado
        // Viaje finalizaado
        setSearchSegui(false);
        setSeguimiento(5);
        setIsVisibleLoading(false);
        await AsyncStorage.removeItem("id_pedido");

        const data = await API.get(
          `ratting/order/?pedido=${id_pedido}&format=json`
        );
        //console.log("Info: de califiaci??n pedido: ", data.data);

        if (data.data[0].puntos > 0) {
          setPuntos(data.data.puntos);
          setDisableRatting(true);
        }
      }

      if (resUser.estado === 8) {
        // Cancelado
        // Viaje finalizaado
        setSearchSegui(false);
        setSeguimiento(5);
        setIsVisibleLoading(false);
        await AsyncStorage.removeItem("id_pedido");
      }

      if (resUser.estado === 6)
        // En viaje
        setSeguimiento(4);
      if (resUser.estado === 5)
        // En camino
        setSeguimiento(3);

      if (resUser.estado === 4) {
        // Confirmado
        setSeguimiento(2);
        setSearchSegui(true); // Sincronice estado
        setIsVisibleLoading(false);
      }
      if (resUser.estado === 3)
        // En espera
        setSeguimiento(1);

      if (resUser.estado === 9) {
        // Por confirmar por parte del cliente (Conductor disponible)
        setIsVisibleLoading(true);
        setTxt(
          "??Aceptar pedido? \n \n Valor:" +
            resUser.precio +
            "\n Tiempo: " +
            resUser.tiempo
        );
        setSearchSegui(false); // No sincronice por el momento.
      }
    }
  };

  // Para actualizar el estado de lo que va ocurriendo en el pedido.
  useEffect(() => {
    if (seguimiento <= 4) {
      const interval = setInterval(() => {
        getInfo();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, []);

  const labels = [
    "Solicitado",
    "Confirmado",
    "En camino",
    "Viajando",
    "Finalizado",
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fe7013",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#fe7013",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013",
  };

  const [expanded, setExpanded] = useState(true);
  const [expanded2, setExpanded2] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  const handlePress2 = () => setExpanded2(!expanded2);

  const [puntos, setPuntos] = useState(5);
  const [disableRatting, setDisableRatting] = useState(false);

  const ValuePuntos = (ratting) => {
    setPuntos(ratting);
  };

  const Calificar = async () => {
    console.log("Algo");
    const payloadAccount = {
      puntos: puntos,
      account: conductor.id,
      realizado_by: infoViaje.id,
    };

    const payloadPedido = {
      puntos: puntos,
      pedido: id_pedido,
      realizado_by: infoViaje.id,
    };

    // Registramos calificaci?? al conductor
    await API.post(`ratting/account/`, payloadAccount);
    // Registramos calificaci?? del pedido
    await API.post(`ratting/order/`, payloadPedido);
    setDisableRatting(true);

    if (conductor.tokenPush !== "")
      NotifiyPush(conductor.tokenPush, "El cliente ha calificado tu viaje!");
    navigation.popToTop();
  };

  return (
    <Container style={{ flex: 1 }}>
      <CustomHeader
        navigation={navigation}
        title={title}
        isHome={false}
        isLogin={false}
      />
      <Popup
        text={txt}
        isVisible={isVisibleLoading}
        pedido={id_pedido}
        tokenPush={conductor.tokenPush}
        conductor={conductor.id}
        NotifiyPush={NotifiyPush}
      />
      {/* <View>
        <Image source={ICONOS.LOADING} style={styles.logo} resizeMode="cover" />
      </View> */}

      <List.Section>
        <List.Accordion
          title="Info. del viaje"
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expanded}
          onPress={handlePress}
        >
          <Text>Creado el: {infoViaje.creado}</Text>
          <Text>Direcci??n: {infoViaje.direccion}</Text>
          <Text>Observaci??n: {infoViaje.observacion}</Text>
          <Text>Telefono alternativo: {infoViaje.telefono}</Text>
        </List.Accordion>
        {conductor.nombre !== "" && (
          <List.Accordion
            title="Conductor"
            left={(props) => <List.Icon {...props} icon="folder" />}
          >
            {/* <Text>A??n estamos buscando un conductor disponible</Text> */}
            <View>
              <Avatar.Image
                size={55}
                source={{
                  uri: conductor.photo,
                }}
              />
              <Text>Placa: {conductor.placa}</Text>
              <Text>Nombre: {conductor.nombre}</Text>
              <Text>Tiempo de espera: {conductor.tiempo}</Text>
            </View>
          </List.Accordion>
        )}
        <List.Accordion
          title="Seguimiento"
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expanded2}
          onPress={handlePress2}
        >
          <StepIndicator
            customStyles={customStyles}
            currentPosition={seguimiento}
            labels={labels}
          />
        </List.Accordion>

        {seguimiento >= 2 && seguimiento <= 4 && (
          <View>
            <Text>{"\n Muy demorado?"}</Text>
            <Picker
              mode="dropdown"
              style={{ marginLeft: 10, width: 150 }}
              selectedValue={seguiEstado}
              onValueChange={(itemValue, itemIndex) =>
                Changed2Estado(itemValue, conductor.id)
              }
            >
              <Picker.Item key="0" label="Seleccione estado" value="0" />
              <Picker.Item key="8" label="Cancelar" value="8" />
            </Picker>
          </View>
        )}
        {seguimiento === 5 && (
          <View style={styles.butt}>
            <AirbnbRating
              count={5}
              reviews={["Muy Mal", "Mal", "Regular", "Bien", "Excelente"]}
              defaultRating={puntos}
              size={20}
              isDisabled={disableRatting}
              onFinishRating={ValuePuntos}
            />
            <Text>{"\n"}</Text>
            {disableRatting === false && (
              <AppButton action={Calificar} title="Calificar Servicio" />
            )}
          </View>
        )}
      </List.Section>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  logo: {
    height: 64,
    width: 64,
  },
  conductor: {
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  butt: {
    marginTop: 30,
    alignItems: "center",
    color: "#FFFFFF",
    fontSize: 15,
  },
});
