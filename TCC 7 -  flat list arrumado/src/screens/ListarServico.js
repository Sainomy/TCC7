import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Layout, Text, TopNav, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

import { auth, firestore } from "../../firebase";

export default function ListarServico({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [servicos, setServicos] = useState([]); // Initial empty array of users
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    const subscriber = firestore
      .collection("Usuario")
      .doc(auth.currentUser.uid)
      .collection("Servico")
      .onSnapshot((querySnapshot) => {
        const servicos = [];
        querySnapshot.forEach((documentSnapshot) => {
          servicos.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setServicos(servicos);
        setLoading(false);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      // coloca alinhamento em linha justificado flex-start
      <View style={styles.alinhamentoLinha}>
        <Image style={styles.image} source={{ uri: item.urlfoto }} />

        {/* // coloca alinhamento em coluna justificado flex-start */}
        <View style={styles.alinhamentoColuna}>
          <Text style={styles.itemStylee}>{item.nomecat}</Text>
          <Text style={styles.itemStyle}>R${item.valor} </Text>
          {/* fecha alinhamento colunas */}
          <RatingBar />
          <Text>
            {defaultRating} / {Math.max.apply(null, maxRating)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => alert(defaultRating)}
          ></TouchableOpacity>
        </View>

        {/* fecha alinhamento linhas */}
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.separador} />
    );
  };
  const RatingBar = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={{
                  width: 25,
                  height: 25,
                }}
                source={
                  item <= defaultRating
                    ? require("../../assets/star.png")
                    : require("../../assets/st.png")
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Layout>
      <TopNav
        style={{ flex: 1 }}
        middleContent={
          <Image
            source={require("../../assets/nome.png")}
            style={{ width: 110, height: 110 }}
            resizeMode="contain"
          />
        }
        leftContent={<Ionicons name="chevron-back" size={20} />}
        leftAction={() => navigation.goBack()}
      />
      <SafeAreaView style={styles.containerSafeArea}>
        <View style={styles.container}>
          <FlatList
            data={servicos}
            keyExtractor={(item) => item.id}
            //  ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
  },
  container: {},
  itemStylee: {
    fontSize: 20,
    padding: 5,
    marginTop: 10,
  },
  itemStyle: {
    fontSize: 18,
    padding: 5,
    color: "green",
  },
  alinhamentoLinha: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    margin: 15,
    borderRadius: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  alinhamentoColuna: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: "center",
  },

  // separador: {
  //   height: 1,
  //   width: "100%",
  // },
});
