import React, { useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import CardCrowdFunding from "../components/CardCrowdFunding";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import { isLogin } from "../../query/global";
import { useQuery } from "@apollo/client";
import { GET_CROWDFUNDING } from "../../query/crowdFunding";
import client from "../../config/apolloClient";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      client.refetchQueries({
        include: "active",
      });
      setRefreshing(false);
    });
  }, []);
  const { loading, error, data } = useQuery(GET_CROWDFUNDING);

  if (loading)
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

  const DATA = data.getCrowdFunding;

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
      {error && <Text>Error</Text>}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
