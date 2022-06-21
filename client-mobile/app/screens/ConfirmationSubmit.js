import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { useQuery } from "@apollo/client";
import { CHECK_BALANCE } from "../../query/crowdFunding";
import * as SecureStore from "expo-secure-store";
import { access_token } from "../../query/global";
import { useMutation } from "@apollo/client";
import { USER_APPROVE_CROWDFUNDING } from "../../query/crowdFunding";
import { ActivityIndicator } from "react-native";
import moment from "moment";

export default function ConfirmationSubmit({ route, navigation }) {
  const data = route.params.data;
  console.log(data);
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
      Alert.alert(
        "Warning",
        "Your saldo is not enough for make this payment, please top up"
      );
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
      <View
        style={{
          paddingTop: 30,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "700" }}>
          Your Submission Under Review By Admin
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{ backgroundColor: "#e2e8f0", marginBottom: 30, width: "100%" }}
      >
        <View style={styles.container}>
          <Text style={styles.headerSection}>
            Crowd Funding has been verified by admin
          </Text>
        </View>
        <View style={[styles.container, { flexDirection: "row" }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textLeftSide}>Applicant`s Name</Text>
            <Text style={styles.textLeftSide}>Submission Date</Text>
            <Text style={styles.textLeftSide}>Users Join</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.textRightSide}>
              {data.User.firstName} {data.User.lastName}
            </Text>
            <Text style={styles.textRightSide}>
              {moment(data.createdAt).format("dddd Do MMMM YYYY")}
            </Text>
            <Text style={styles.textRightSide}></Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.headerSection}>Detail Product</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: data.productImage }}
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
                marginEnd: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 11, marginBottom: 5, textAlign: "justify" }}
              >
                {data.productName}
              </Text>
              <Text style={{ fontSize: 11, color: "#64748b" }}>
                {data.initialQuantity} x IDR {data.finalProductPrice}
              </Text>
            </View>
          </View>
        </View>
        {data.status !== "Pending" && (
          <View>
            <View style={styles.container}>
              <Text style={styles.headerSection}>Payment Detail</Text>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.textLeftSide}>Product Price</Text>
                  <Text style={styles.textLeftSide}>Quantity</Text>
                  <Text
                    style={
                      ([styles.textLeftSide],
                      { fontWeight: "700", marginTop: 10 })
                    }
                  >
                    Total Price
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <NumberFormat
                    value={2000}
                    displayType="text"
                    thousandSeparator={true}
                    prefix="IDR "
                    renderText={(value) => (
                      <Text style={styles.textRightSide}>{value}</Text>
                    )}
                  />
                  <Text style={styles.textRightSide}>pcs</Text>
                  <NumberFormat
                    value={6000}
                    displayType="text"
                    thousandSeparator={true}
                    prefix="IDR "
                    renderText={(value) => (
                      <Text
                        style={{
                          fontWeight: "700",
                          marginTop: 10,
                          textAlign: "right",
                        }}
                      >
                        {value}
                      </Text>
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={handlePayment}>
        <View
          style={{
            backgroundColor: "#16a34a",
            paddingHorizontal: 50,
            paddingVertical: 10,
          }}
        >
          <Text
            style={{ color: "#fff", textAlign: "center", fontWeight: "800" }}
          >
            Make Payment
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginTop: 5,
  },
  headerSection: {
    fontSize: 14,
    fontWeight: "700",
  },
  textRightSide: {
    textAlign: "right",
    paddingVertical: 5,
    fontSize: 12,
  },
  textLeftSide: {
    textAlign: "left",
    paddingVertical: 5,
    fontSize: 12,
    color: "#64748b",
  },
});
