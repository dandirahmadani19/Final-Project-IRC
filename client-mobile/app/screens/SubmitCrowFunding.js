import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Form, FormItem } from "react-native-form-component";
import {
  GET_CROWDFUNDING,
  SUBMIT_CROWDFUNDING,
  HISTORY_SUBMIT,
} from "../../query/crowdFunding";
import { useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import client from "../../config/apolloClient";
import { userProfile } from "../../query/global";

export default function SubmitCrowFunding({ navigation }) {
  const [dataSubmit, setDataSubmit] = useState({
    productName: "",
    initialProductPrice: "",
    initialQuantity: "",
    manufactureName: "",
    linkProduct: "",
  });
  const [submitCrowdFunding, { loading, error, data }] =
    useMutation(SUBMIT_CROWDFUNDING);

  const handleSubmitCrowdFunding = () => {
    if (
      !dataSubmit.productName ||
      !dataSubmit.initialProductPrice ||
      !dataSubmit.initialQuantity ||
      !dataSubmit.manufactureName ||
      !dataSubmit.linkProduct
    ) {
      Alert.alert("Warning", "Please Fill All Field");
    } else {
      const minimumBalance =
        +dataSubmit.initialProductPrice * dataSubmit.initialQuantity * 0.2;
      if (userProfile().Balance.amount < minimumBalance) {
        Alert.alert(
          "Warning",
          "Minimum balance must be above 20% of the total price"
        );
      } else {
        SecureStore.getItemAsync("access_token").then((result) => {
          if (result) {
            const newDataSubmit = {
              initialProductPrice: +dataSubmit.initialProductPrice,
              initialQuantity: +dataSubmit.initialQuantity,
              productName: dataSubmit.productName,
              manufactureName: dataSubmit.manufactureName,
              linkProduct: dataSubmit.linkProduct,
              access_token: result,
            };

            submitCrowdFunding({
              variables: { dataSubmitCrowFunding: newDataSubmit },
            });
            setDataSubmit({
              productName: "",
              initialProductPrice: "",
              initialQuantity: "",
              manufactureName: "",
              linkProduct: "",
            });

            client.refetchQueries({
              include: [HISTORY_SUBMIT],
            });
            navigation.navigate("LoadingScreen", {
              title: "Your Submission is being accepted and under verification",
            });
          }
        });
      }
    }
  };

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
  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          paddingVertical: 20,
          marginTop: 20,
          borderRadius: 10,
          width: "100%",
        }}
      >
        <Form
          onButtonPress={handleSubmitCrowdFunding}
          buttonStyle={{
            backgroundColor: "#15803d",
            marginTop: 10,
          }}
          buttonText="Submit"
        >
          <FormItem
            label="Product Name"
            isRequired
            value={dataSubmit.productName}
            onChangeText={(e) =>
              setDataSubmit({ ...dataSubmit, productName: e })
            }
            keyboardType="default"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
          />

          <FormItem
            label="Product Price"
            isRequired
            value={dataSubmit.initialProductPrice}
            onChangeText={(e) =>
              setDataSubmit({ ...dataSubmit, initialProductPrice: e })
            }
            keyboardType="numeric"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
          />
          <FormItem
            label="Quantity To buy"
            isRequired
            value={dataSubmit.initialQuantity}
            onChangeText={(e) =>
              setDataSubmit({ ...dataSubmit, initialQuantity: e })
            }
            keyboardType="numeric"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
          />

          <FormItem
            label="Manufacture Name"
            isRequired
            value={dataSubmit.manufactureName}
            onChangeText={(e) =>
              setDataSubmit({ ...dataSubmit, manufactureName: e })
            }
            keyboardType="default"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
          />
          <FormItem
            label="Link Product In Alibaba"
            isRequired
            value={dataSubmit.linkProduct}
            onChangeText={(e) =>
              setDataSubmit({ ...dataSubmit, linkProduct: e })
            }
            keyboardType="default"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
          />
        </Form>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: "#000",
    borderWidth: 0.5,
  },
});
