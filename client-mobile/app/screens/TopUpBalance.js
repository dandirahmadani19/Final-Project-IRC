import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { Form, FormItem } from "react-native-form-component";

export default function TopUpBalance() {
  const [amount, setAmount] = useState();
  const handleTopUp = () => {
    console.log(amount);
    // disini handle paymentnya
  };
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginTop: 20,
          borderRadius: 10,
          width: "100%",
        }}
      >
        <Form
          onButtonPress={handleTopUp}
          buttonStyle={{
            backgroundColor: "#15803d",
            marginTop: 10,
          }}
          buttonText="Top Up"
        >
          <FormItem
            label="Amount"
            isRequired
            value={amount}
            onChangeText={(e) => setAmount(e)}
            keyboardType="number-pad"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
          />
        </Form>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: "#000",
    borderWidth: 0.5,
  },
});
