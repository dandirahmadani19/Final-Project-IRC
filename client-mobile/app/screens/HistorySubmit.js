import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { HISTORY_SUBMIT } from "../../query/crowdFunding";

import React from "react";
import CardHistoryCrowdFunding from "../components/CardHistoryCrowdFunding";
import * as SecureStore from "expo-secure-store";
import { access_token } from "../../query/global";
import { ActivityIndicator, RefreshControl } from "react-native";
import client from "../../config/apolloClient";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function HistorySubmit({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      client.refetchQueries({
        include: [HISTORY_SUBMIT],
      });
      setRefreshing(false);
    });
  }, []);
  const { loading, error, data } = useQuery(HISTORY_SUBMIT, {
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

  const handleOnPress = (data) => {
    if (data.status === "Pending") {
      navigation.navigate("ConfirmationSubmit", { data });
    } else {
      navigation.navigate("DetailHistorySubmit", { data });
    }
  };
  const renderItem = ({ item }) => {
    return (
      <CardHistoryCrowdFunding
        data={item}
        onPress={(e, data = item) => handleOnPress(data)}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data?.getHistorySubmitCrowdFunding}
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
