import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Form, FormItem } from "react-native-form-component";
import { useState } from "react";

export default function FormJoin({ route }) {
  const idCrowdFunding = route.params.data.id;

  const [quantity, setQuantity] = useState("");

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
          onButtonPress={() => console.log(quantity)}
          buttonStyle={{ backgroundColor: "#15803d" }}
        >
          <FormItem
            label="Quantity"
            isRequired
            value={quantity}
            onChangeText={(quantity) => setQuantity(quantity)}
            keyboardType="numeric"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={{
              borderColor: "#000",
              borderWidth: 0.5,
            }}
          />
        </Form>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
