import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useQuery } from "@apollo/client";
import { CHECK_BALANCE } from "../../query/crowdFunding";
import * as SecureStore from "expo-secure-store";
import { access_token } from "../../query/global";
import { useMutation } from "@apollo/client";
import { USER_APPROVE_CROWDFUNDING } from "../../query/crowdFunding";
import { ActivityIndicator } from "react-native";

export default function ConfirmationSubmit({ route, navigation }) {
  const data = route.params.data;
  const totalPrice = data.currentQuantity * data.finalProductPrice;
  const {
    loading,
    error,
    data: isEnough,
  } = useQuery(CHECK_BALANCE, {
    variables: { totalPrice: +totalPrice, accessToken: access_token() },
  });

  const [
    userApprove,
    { loading: loadingApprove, error: errorAprrove, data: message },
  ] = useMutation(USER_APPROVE_CROWDFUNDING);

  const handlePayment = () => {
    if (isEnough?.checkBalance.isEnough) {
      userApprove({
        variables: { accessToken: access_token(), idCrowdFunding: +data.id },
      });
    } else {
      Alert.alert("Warning", "Your saldo insufficient, please top up");
      //   navigation.navigate("TopUp");
    }
  };

  if (
    message?.userApproveCrowdFunding.message === "Crowd Funding success to open"
  ) {
    Alert.alert("Success", "Crowd Funding success to open");
    navigation.goBack();
  }

  if (loading || loadingApprove) {
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
  if (!data.finalProductPrice) {
    return (
      <View>
        <Text>Your Submission Under Review</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>ConfirmationSubmit</Text>
      <TouchableOpacity onPress={handlePayment}>
        <View
          style={{
            backgroundColor: "black",
            padding: 1,
          }}
        >
          <Text style={{ color: "#fff" }}>Make Payment</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
