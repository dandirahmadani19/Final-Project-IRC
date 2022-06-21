import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

export default function JoinSuccess({ navigation }) {
  console.log(navigation);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: "https://www.pngall.com/wp-content/uploads/2016/07/Success-PNG-Image.png",
        }}
        style={{
          width: 100,
          height: 100,
        }}
      />
      <Text
        style={{
          fontSize: 25,
          fontWeight: "900",
          marginVertical: 20,
        }}
      >
        Your Payment Has Been Successfully
      </Text>
      <TouchableOpacity onPress={() => navigation.popToTop()}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "green",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Back To Home</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
