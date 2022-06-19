import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";

import React from "react";
import CardHistoryCrowdFunding from "../components/CardHistoryCrowdFunding";

export default function HistorySubmit({ navigation }) {
  const DATA = [
    {
      id: 1,
      firstName: "Dandi",
      lastName: "Rahmadani",
      imageProduct:
        "https://sc04.alicdn.com/kf/H497e737b91c04b35a8336cc2f590742aP.png",
      productName:
        "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
      userAmount: 4,
      currentQuantity: 300,
      targetQuantity: 203,
      initialQuantity: 100,
      status: "open",
      userName: "Dandi Rahmadani",
      finalProductPrice: 120000,
      hsCode: "234568",
      startDate: "2022-06-17T16:14:16.940Z",
      createdDate: "2022-06-17T16:14:16.940Z",
      expiredDay: 30,
    },
    {
      id: 2,
      firstName: "Dandi",
      lastName: "Rahmadani",
      imageProduct:
        "https://sc04.alicdn.com/kf/H497e737b91c04b35a8336cc2f590742aP.png",
      productName:
        "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
      userAmount: 4,
      currentQuantity: 300,
      targetQuantity: 203,
      initialQuantity: 100,
      status: "success",
      userName: "Dandi Rahmadani",
      finalProductPrice: 120000,
      hsCode: "234568",
      startDate: "2022-06-17T16:14:16.940Z",
      createdDate: "2022-06-17T16:14:16.940Z",
      expiredDay: 30,
    },
    {
      id: 3,
      firstName: "Dandi",
      lastName: "Rahmadani",
      imageProduct:
        "https://sc04.alicdn.com/kf/H497e737b91c04b35a8336cc2f590742aP.png",
      productName:
        "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
      userAmount: 4,
      currentQuantity: 300,
      targetQuantity: 203,
      initialQuantity: 100,
      status: "failed",
      userName: "Dandi Rahmadani",
      finalProductPrice: 120000,
      hsCode: "234568",
      startDate: "2022-06-17T16:14:16.940Z",
      createdDate: "2022-06-17T16:14:16.940Z",
      expiredDay: 30,
    },
    {
      id: 4,
      firstName: "Dandi",
      lastName: "Rahmadani",
      imageProduct:
        "https://sc04.alicdn.com/kf/H497e737b91c04b35a8336cc2f590742aP.png",
      productName:
        "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
      userAmount: 4,
      currentQuantity: 300,
      targetQuantity: 203,
      initialQuantity: 100,
      status: "pending",
      userName: "Dandi Rahmadani",
      finalProductPrice: 120000,
      hsCode: "234568",
      startDate: "2022-06-17T16:14:16.940Z",
      createdDate: "2022-06-17T16:14:16.940Z",
      expiredDay: 30,
    },
  ];
  const handleOnPress = (data) => {
    navigation.navigate("DetailHistorySubmit", { data });
  };
  const renderItem = ({ item }) => (
    <CardHistoryCrowdFunding
      data={item}
      onPress={(e, data = item) => handleOnPress(data)}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e8f0",
  },
});
