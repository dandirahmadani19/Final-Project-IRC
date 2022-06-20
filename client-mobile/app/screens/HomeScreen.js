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
import { useQuery } from "@apollo/client";
import { GET_CROWDFUNDING } from "../../query/crowdFunding";

const HomeScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_CROWDFUNDING);
  console.log(data);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error!</Text>;
  const DATA = data.getCrowdFunfing;
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
