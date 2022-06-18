import React, { useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  View,
  Text,
} from "react-native";
import CardCrowdFunding from "../components/CardCrowdFunding";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import { isLogin } from "../../query/global";

const DATA = [
  {
    id: 1,
    imageProduct:
      "https://sc04.alicdn.com/kf/H497e737b91c04b35a8336cc2f590742aP.png",
    productName:
      "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
    userAmount: 4,
    currentQuantity: 300,
    targetQuantity: 203,
    daysToGo: 6,
    userName: "Dandi Rahmadani",
    productPrice: 120000,
    startDate: "2022-06-17T16:14:16.940Z",
    expiredDay: 30,
  },
  {
    id: 2,
    imageProduct:
      "https://sc04.alicdn.com/kf/H497e737b91c04b35a8336cc2f590742aP.png",
    productName:
      "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
    userAmount: 4,
    currentQuantity: 1200,
    targetQuantity: 5000,
    daysToGo: 6,
    userName: "James Bond",
    productPrice: 120000,
    startDate: "2022-06-17T16:14:16.940Z",
    expiredDay: 18,
  },
  {
    id: 3,
    imageProduct:
      "https://sc04.alicdn.com/kf/H497e737b91c04b35a8336cc2f590742aP.png",
    productName:
      "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
    userAmount: 4,
    currentQuantity: 1200,
    targetQuantity: 5000,
    daysToGo: 6,
    userName: "James Bond",
    productPrice: 120000,
    startDate: "2022-06-17T16:14:16.940Z",
    expiredDay: 14,
  },
  {
    id: 4,
    imageProduct:
      "https://sc04.alicdn.com/kf/H497e737b91c04b35a8336cc2f590742aP.png",
    productName:
      "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
    userAmount: 4,
    currentQuantity: 1200,
    targetQuantity: 5000,
    daysToGo: 6,
    userName: "James Bond",
    productPrice: 120000,
    startDate: "2022-06-17T16:14:16.940Z",
    expiredDay: 23,
  },
  {
    id: 5,
    imageProduct:
      "https://s.alicdn.com/@sc04/kf/H8d66d54811d44603a199cfbcf6ac9439r.jpg_960x960.jpg",
    productName:
      "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
    userAmount: 4,
    currentQuantity: 3119,
    targetQuantity: 5000,
    daysToGo: 6,
    userName: "James Bond",
    productPrice: 120000,
    startDate: "2022-06-07T16:14:16.940Z",
    expiredDay: 10,
  },
];

const HomeScreen = ({ navigation }) => {
  //   console.log(isLogin());
  useEffect(() => {
    console.log(isLogin());
  }, [isLogin()]);
  const handleOnPress = (id, data) => {
    navigation.navigate("Detail", { id, data });
  };
  const renderItem = ({ item }) => (
    <CardCrowdFunding
      data={item}
      onPress={(e, id = item.id, data = item) => handleOnPress(id, data)}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e8f0",
  },
});

export default HomeScreen;
