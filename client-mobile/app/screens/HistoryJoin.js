import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";

import React from "react";
import CardHistoryCrowdFunding from "../components/CardHistoryCrowdFunding";
import { useQuery } from "@apollo/client";
import { HISTORY_JOIN } from "../../query/crowdFunding";
import { access_token } from "../../query/global";
import CardHistoryJoin from "../components/CardHistoryJoin";

export default function HistoryJoin({ navigation }) {
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
