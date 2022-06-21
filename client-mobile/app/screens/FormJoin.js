import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Form, FormItem } from "react-native-form-component";
import { useState } from "react";
import { userProfile } from "../../query/global";

export default function FormJoin({ route }) {
  const data = route.params.data;
  console.log(data);

  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const handleOnSubmit = () => {
    const totalPrice = data.finalProductPrice * +quantity;
    const saldo = userProfile().Balance?.amount;

    const maxQuantity = data.targetQuantiy - data.currentQuantity;
    if (saldo >= totalPrice) {
      if (quantity > maxQuantity) {
        Alert.alert("Warning", `Max quantity is ${maxQuantity}`);
      } else {
        Alert.alert(
          "Confirmation ?",
          "Are you sure you want to join for this crowdfunding, your balance will be reduced automatically",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
              },
            },
          ]
        );
      }
    } else {
      Alert.alert("Warning", "Your balance is not enough, please top up first");
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
        <Form
          onButtonPress={handleOnSubmit}
          buttonStyle={{ backgroundColor: "#15803d" }}
        >
          <FormItem
            label="Quantity"
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
            }}
          />
          <Text>Product Price : {data.finalProductPrice}</Text>
          <Text>Total Price : {totalPrice}</Text>
          <Text>
            Max Quantity To Buy {data.targetQuantity - data.currentQuantity} pcs
          </Text>
        </Form>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
