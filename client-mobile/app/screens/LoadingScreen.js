import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

export default function LoadingScreen({ navigation, route }) {
  setTimeout(() => {
    navigation.navigate("JoinSuccess", { title: route.params.title });
  }, 2000);
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <ActivityIndicator size={"large"} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({});
