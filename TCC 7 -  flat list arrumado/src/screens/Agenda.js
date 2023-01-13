import React from "react";
import { View, Image } from "react-native";
import { Layout, Text, TopNav } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
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
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Calendário</Text>
      </View>
    </Layout>
  );
}
