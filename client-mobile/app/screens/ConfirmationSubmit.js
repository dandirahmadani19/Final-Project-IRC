import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Modal,
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
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function ConfirmationSubmit({ route, navigation }) {
  const data = route.params.data;
  console.log(data);
  const [modalVisible, setModalVisible] = useState(false);

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
  };
  if (
    messageDenyCrowdFunding?.denyCrowdFunding.message ===
    "success deny crowdfunding"
  ) {
    navigation.navigate("LoadingScreen", {
      title: "Crowd Funding Has Been Deny",
    });
  }

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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              How do we get the final product price ?
            </Text>
            <Text style={styles.modalBody}>
              Shipping + Insurance (From China To Indonesia)
            </Text>
            <Text style={styles.modalBody}>
              Import Tax for HS Code : {data.hscode}
            </Text>
            <Text style={styles.modalBody}>
              Please check on https://insw.go.id/intr
            </Text>

            <Text style={styles.modalBody}>Delivery Cost to Your Address</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="close-circle-outline" size={25} />
            </Pressable>
          </View>
        </View>
      </Modal>
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
            <Text style={styles.textLeftSide}>hscode</Text>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Pressable onPress={() => setModalVisible(true)}>
                <Ionicons name="help-circle-outline" size={18} color="black" />
              </Pressable>
              <NumberFormat
                value={data.finalProductPrice}
                displayType="text"
                thousandSeparator={true}
                prefix="IDR "
                renderText={(value) => (
                  <Text style={styles.textRightSide}>{value}</Text>
                )}
              />
            </View>
            <Text style={styles.textRightSide}>{data.targetQuantity} pcs</Text>
            <Text style={styles.textRightSide}>{data.hscode}</Text>
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
  centeredView: {
    flex: 1,
    marginTop: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "800",
  },
  modalBody: {
    fontSize: 11,
    textAlign: "left",
  },
});
