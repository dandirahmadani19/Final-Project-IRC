import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import React from "react";
import CardHistoryCrowdFunding from "../components/CardHistoryCrowdFunding";
import { useQuery } from "@apollo/client";
import { HISTORY_JOIN } from "../../query/crowdFunding";
import { access_token } from "../../query/global";
import CardHistoryJoin from "../components/CardHistoryJoin";
import client from "../../config/apolloClient";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function HistoryJoin({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      client.refetchQueries({
        include: [HISTORY_JOIN],
      });
      setRefreshing(false);
    });
  }, []);

  const { loading, error, data } = useQuery(HISTORY_JOIN, {
    variables: { accessToken: access_token() },
  });

  if (loading && !data) {
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

  if (!data?.length) {
    return (
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 15,
          marginTop: 30,
        }}
      >
        You've never joined crowdfunding
      </Text>
    );
  }

  const handleOnPress = (data) => {
    navigation.navigate("DetailHistoryJoin", { data });
  };
  const renderItem = ({ item }) => (
    <CardHistoryJoin
      data={item}
      onPress={(e, data = item) => handleOnPress(data)}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data?.getHistoryJoinCrowdFunding}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
