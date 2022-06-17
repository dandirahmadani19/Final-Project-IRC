import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function DetailScreen({ route }) {
  return (
    <View>
      <Text>{route.params.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
