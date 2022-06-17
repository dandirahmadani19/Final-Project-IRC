import React from "react";
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

const DATA = [
  {
    id: 1,
    imageProduct:
      "https://sc04.alicdn.com/kf/H497e737b91c04b35a8336cc2f590742aP.png",
    productName:
      "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
    userAmount: 4,
    currentQuantity: 1200,
    targetQuantity: 5000,
    daysToGo: 6,
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
  },
  {
    id: 5,
    imageProduct:
      "https://sc04.alicdn.com/kf/H497e737b91c04b35a8336cc2f590742aP.png",
    productName:
      "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
    userAmount: 4,
    currentQuantity: 1200,
    targetQuantity: 5000,
    daysToGo: 6,
  },
];

const HomeScreen = ({ navigation }) => {
  const handleOnPress = (id) => {
    console.log(id);
    navigation.navigate("Detail", { id });
  };
  const renderItem = ({ item }) => (
    <CardCrowdFunding
      data={item}
      onPress={(e, id = item.id) => handleOnPress(id)}
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
