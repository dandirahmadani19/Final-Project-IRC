import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { access_token, userProfile } from "../../query/global";
import { useMutation } from "@apollo/client";
import {
  USER_APPROVE_CROWDFUNDING,
  GET_CROWDFUNDING,
  DENY_CROWDFUNDING,
} from "../../query/crowdFunding";
import { ActivityIndicator } from "react-native";
import moment from "moment";
import NumberFormat from "react-number-format";
import client from "../../config/apolloClient";
import {
  formatCurrency,
  getSupportedCurrencies,
} from "react-native-format-currency";

export default function ConfirmationSubmit({ route, navigation }) {
  const data = route.params.data;
  console.log(data);
  const totalPrice = data.currentQuantity * data.finalProductPrice;
  const [
    userApprove,
    { loading: loadingApprove, error: errorAprrove, data: message },
  ] = useMutation(USER_APPROVE_CROWDFUNDING);

  const [denyCrowdFunding, { loading, error, data: messageDenyCrowdFunding }] =
    useMutation(DENY_CROWDFUNDING);

  const [valueFormattedWithSymbol] = formatCurrency({
    amount: totalPrice,
    code: "IDR",
  });

  const handlePayment = () => {
    const balance = userProfile().Balance?.amount;
    if (balance >= totalPrice) {
      Alert.alert(
        "Konfirmasi Pembayaran ?",
        `Saldo anda akan dikurangi sejumlah ${valueFormattedWithSymbol}`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Make Payment",
            onPress: () => {
              userApprove({
                variables: {
                  accessToken: access_token(),
                  idCrowdFunding: +data.id,
                },
              });
              client.refetchQueries({
                include: [GET_CROWDFUNDING],
              });
              navigation.navigate("LoadingScreen", {
                title: "Your Payment Has Been Successfully",
              });
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Warning",
        "Your saldo is not enough for make this payment, please top up"
      );
    }
  };

  const handleDeny = () => {
    denyCrowdFunding({ variables: { idCrowdFunding: +data.id } });
    navigation.navigate("LoadingScreen", {
      title: "Crowd Funding Has Been Deny",
    });
  };

  if (loadingApprove) {
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
        <View
          style={[
            styles.container,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <Text style={{ fontWeight: "900" }}>Your Balance</Text>
          <NumberFormat
            value={userProfile().Balance.amount}
            displayType="text"
            thousandSeparator={true}
            prefix="IDR "
            renderText={(value) => (
              <Text style={{ fontWeight: "900" }}>{value}</Text>
            )}
          />
        </View>
        <View style={[styles.container, { flexDirection: "row" }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textLeftSide}>Applicant`s Name</Text>
            <Text style={styles.textLeftSide}>Submission Date</Text>
            <Text style={styles.textLeftSide}>Initial Price</Text>
            <Text style={styles.textLeftSide}>Final Price</Text>
            <Text style={styles.textLeftSide}>Target Quantity</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.textRightSide}>
              {data.User?.firstName} {data.User?.lastName}
            </Text>
            <Text style={styles.textRightSide}>
              {moment(data.createdAt).format("dddd Do MMMM YYYY")}
            </Text>
            <NumberFormat
              value={data.initialProductPrice}
              displayType="text"
              thousandSeparator={true}
              prefix="IDR "
              renderText={(value) => (
                <Text style={styles.textRightSide}>{value}</Text>
              )}
            />
            <NumberFormat
              value={data.finalProductPrice}
              displayType="text"
              thousandSeparator={true}
              prefix="IDR "
              renderText={(value) => (
                <Text style={styles.textRightSide}>{value}</Text>
              )}
            />
            <Text style={styles.textRightSide}>{data.targetQuantity} pcs</Text>
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
                {data.currentQuantity} x IDR {data.finalProductPrice}
              </Text>
            </View>
          </View>
        </View>
        {/* {data.status !== "Pending" && ( */}
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
                  value={data.finalProductPrice}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="IDR "
                  renderText={(value) => (
                    <Text style={styles.textRightSide}>{value}</Text>
                  )}
                />
                <Text style={styles.textRightSide}>
                  {data.currentQuantity} pcs
                </Text>
                <NumberFormat
                  value={totalPrice}
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
        {/* )} */}
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={handlePayment}>
          <View
            style={{
              backgroundColor: "#16a34a",
              width: 170,
              marginEnd: 10,
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
        <TouchableOpacity onPress={handleDeny}>
          <View
            style={{
              backgroundColor: "#dc2626",
              width: 170,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{ color: "#fff", textAlign: "center", fontWeight: "800" }}
            >
              Deny
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
