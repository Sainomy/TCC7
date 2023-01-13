import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from "react-native";
// import firebaseConfig from "./firebase";
// import firebase from "firebase/compat/app";
// import "firebase/compat/storage";
// const app = firebase.initializeApp(firebaseConfig);
import { auth, firestore, storage } from "../../firebase";
//import { doc, getDoc } from "firebase/firestore";
import { getStorage, uploadBytes } from "firebase/storage"; //access the storage database
import * as ImagePicker from "expo-image-picker";
import { Usuario } from "../../model/Usuario";
import { Servico } from "../../model/Servico"
import { Colors } from "react-native/Libraries/NewAppScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Layout, TopNav, Button, Text} from "react-native-rapi-ui";

// import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
// import { nome } from "../screens/auth/Register";


export default function Profile({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalListaVisible, setModalListaVisible] = useState(false);
  const [servico, setServico] = useState < Partial < Servico>> ({});
  const [usuario, setUsuario] = useState < Partial < Usuario >> ({});
  const [itemLista, setItemLista] = useState({
    ...itemLista,
    id: "",
    title: "",
  });
  const [pickedImagePath, setPickedImagePath] = useState("");
  useEffect(() => {
    const subscriber = firestore
      .collection("Usuario")
      .doc(auth.currentUser.uid)
      .onSnapshot((documentSnapshot) => {
        setUsuario(documentSnapshot.data());
        if (usuario.urlfoto == null) {
          setPickedImagePath("");
        } else {
          setPickedImagePath(usuario.urlfoto);
        };
      });
    return () => subscriber();
  }, [usuario]);

  const escolhefoto = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Camera",
          onPress: () => openCamera(),
          style: "default",
        },

        {
          text: "Abrir galeria",
          onPress: () => showImagePicker(),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };
 
  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      // const storage = app.storage();
      const ref = storage.ref(
        `imagens/profile/IMAGE-${auth.currentUser.uid}.jpg`
      );
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      const fbResult = await uploadBytes(ref, bytes);
      console.log(result.uri);
      console.log("firebase url :", fbResult.metadata.fullPath);
      const reference = firestore
        .collection("Usuario")
        .doc(auth.currentUser.uid);
      const paraDonwload = await storage
        .ref(fbResult.metadata.fullPath)
        .getDownloadURL();
      //reference.update({ urlfoto: fbResult.metadata.fullPath, });
      reference.update({ urlfoto: paraDonwload });
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      //const storage = storage.storage();
      const ref = storage.ref(`imagens/IMAGE-${auth.currentUser.uid}.jpg`);
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      const fbResult = await uploadBytes(ref, bytes);
      console.log(result.uri);
      console.log("firebase url :", fbResult.metadata.fullPath);
      const reference = firestore
        .collection("Usuario")
        .doc(auth.currentUser.uid);
      const paraDonwload = await storage
        .ref(fbResult.metadata.fullPath)
        .getDownloadURL();
      //reference.update({ urlfoto: fbResult.metadata.fullPath, });
      reference.update({ urlfoto: paraDonwload });
    }
  };

  return (
    <Layout>
       <TopNav
        middleContent={
          <Image
            source={require("../../assets/nome.png")}
            style={{ width: 110, height: 110 }}
            resizeMode="contain"
          />
        }
        leftContent={<Ionicons name="menu" size={30} />}
      />
    <View style={styles.screen}>
      <Pressable onPress={() => escolhefoto()}>
        <View style={styles.imageContainer}>
          {pickedImagePath !== "" && (
            <Image source={{ uri: pickedImagePath }} style={styles.image} />
          )}
          {pickedImagePath === "" && (
            <Image
              source={require("../../assets/usuario.png")}
              style={styles.image}
            />
          )}
        <Text style={styles.text}>{usuario.nome}</Text>
        </View>
        </Pressable>
        <Button
              color="#EF8F86"
              text="Adicionar Serviço"
              onPress={() => {
                navigation.navigate("AddServico");
              }}
              style={{
                marginTop: 10,
                backgroundColor: "#E8A998",
              }}
            />
    </View>
    </Layout>
    
  );
      }   
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonContainer: {
    width: 400,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "blue",
  },
  imageContainer: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    resizeMode: "cover",
    borderColor: "#ef846c",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  }
});


