import { Alert, StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React from "react";
import { Form, FormItem } from "react-native-form-component";
import { useState } from "react";
import { access_token, userProfile } from "../../query/global";
import { useMutation, useQuery } from "@apollo/client";
import { HISTORY_JOIN, USER_JOIN_CROWDFUNDING } from "../../query/crowdFunding";
import client from "../../config/apolloClient";
import { GET_USER_PROFILE } from "../../query/user";
import {
  formatCurrency,
  getSupportedCurrencies,
} from "react-native-format-currency";
import NumberFormat from "react-number-format";
import { Ionicons } from "@expo/vector-icons";

export default function FormJoin({ route, navigation }) {
  const data = route.params.data;
  const [modalVisible, setModalVisible] = useState(false);
  const { data: dataUserProfile } = useQuery(GET_USER_PROFILE, {
    variables: { accessToken: access_token() },
  });
  const [userJoinCrowdFunding, {}] = useMutation(USER_JOIN_CROWDFUNDING);

  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const handleOnSubmit = () => {
    const totalPrice = data.finalProductPrice * +quantity;
    const saldo = userProfile().Balance?.amount;

    const maxQuantity = data.targetQuantity - data.currentQuantity;
    const [valueFormattedWithSymbol] = formatCurrency({
      amount: totalPrice,
      code: "IDR",
    });

    if (quantity > maxQuantity) {
      Alert.alert("Warning", `Max quantity is ${maxQuantity}`);
    } else {
      if (saldo >= totalPrice) {
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
                userJoinCrowdFunding({
                  variables: {
                    quantityToBuy: +quantity,
                    totalPrice: +totalPrice,
                    idCrowdFunding: +data.id,
                    accessToken: access_token(),
                  },
                });
                client.refetchQueries({
                  include: [HISTORY_JOIN, GET_USER_PROFILE],
                });

                userProfile(dataUserProfile.getUserProfile);
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
          "Your balance is not enough, please top up first"
        );
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#e2e8f0",
        flex: 1,
        marginTop: 5,
      }}
    >
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
              The number of products you want to buy. Max to buy{" "}
              {data.targetQuantity - data.currentQuantity} Pcs
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="close-circle-outline" size={25} />
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={[styles.container, { flexDirection: "row" }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.textLeftSide}>Your Balance</Text>
          <Text style={styles.textLeftSide}>Product Price</Text>
          <Text style={styles.textLeftSide}>Max Quantity To Buy</Text>
        </View>
        <View style={{ flex: 1 }}>
          <NumberFormat
            value={userProfile().Balance.amount}
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
          <Text style={styles.textRightSide}>
            {data.targetQuantity - data.currentQuantity} Pcs
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 30,
          paddingVertical: 40,
          backgroundColor: "#fff",
          marginTop: 10,
          borderRadius: 10,
        }}
      >
        <Form
          onButtonPress={handleOnSubmit}
          style={{
            alignItems: "center",
          }}
          buttonStyle={{
            backgroundColor: "#15803d",
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 0,
          }}
        >
          <View
            style={{
              width: "80%",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <FormItem
              label="Quantity To Buy"
              isRequired
              value={quantity}
              onChangeText={(quantity) => {
                setTotalPrice(quantity * data.finalProductPrice);
                setQuantity(quantity);
              }}
              keyboardType="numeric"
              floatingLabel={true}
              errorBorderColor="#dc2626"
              style={{
                borderColor: "#000",
                borderWidth: 0.5,
                marginBottom: -5,
                marginEnd: 5,
                width: "100%",
              }}
            />
            <Pressable onPress={() => setModalVisible(true)}>
              <Ionicons name="help-circle-outline" size={22} color="black" />
            </Pressable>
          </View>
        </Form>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  textRightSide: {
    textAlign: "right",
    paddingVertical: 5,
    fontSize: 13,
    fontWeight: "800",
  },
  textLeftSide: {
    textAlign: "left",
    paddingVertical: 5,
    fontSize: 13,
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
  },
});
