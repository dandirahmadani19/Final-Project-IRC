import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { HISTORY_SUBMIT } from "../../query/crowdFunding";

import React from "react";
import CardHistoryCrowdFunding from "../components/CardHistoryCrowdFunding";
import * as SecureStore from "expo-secure-store";
import { access_token } from "../../query/global";
import { ActivityIndicator } from "react-native";

export default function HistorySubmit({ navigation }) {
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
    console.log(item.status);

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
