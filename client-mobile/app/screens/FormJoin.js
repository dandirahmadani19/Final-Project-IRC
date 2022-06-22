import { Alert, StyleSheet, Text, View } from "react-native";
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

export default function FormJoin({ route, navigation }) {
  const data = route.params.data;
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
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: "#fff",
          marginTop: 20,
          borderRadius: 10,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "60%",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              Your Balance
            </Text>
            <NumberFormat
              value={userProfile().Balance.amount}
              displayType="text"
              thousandSeparator={true}
              prefix="IDR "
              renderText={(value) => (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "900",
                  }}
                >
                  {value}
                </Text>
              )}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "60%",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              Product Price
            </Text>
            <NumberFormat
              value={data.finalProductPrice}
              displayType="text"
              thousandSeparator={true}
              prefix="IDR "
              renderText={(value) => (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "900",
                  }}
                >
                  {value}
                </Text>
              )}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "60%",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              Max Quantity To Buy
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              {data.targetQuantity - data.currentQuantity} pcs
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "60%",
              marginBottom: 40,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              Total Price
            </Text>
            <NumberFormat
              value={totalPrice}
              displayType="text"
              thousandSeparator={true}
              prefix="IDR "
              renderText={(value) => (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "900",
                    maxWidth: "50%",
                  }}
                >
                  {value}
                </Text>
              )}
            />
          </View>
        </View>
        <Form
          onButtonPress={handleOnSubmit}
          buttonStyle={{ backgroundColor: "#15803d" }}
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
              marginBottom: 5,
            }}
          />
        </Form>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
