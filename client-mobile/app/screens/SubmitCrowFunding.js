import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Form, FormItem } from "react-native-form-component";

export default function SubmitCrowFunding() {
  const [dataSubmit, setDataSubmit] = useState({
    productName: "",
    targetQuantity: null,
    initialProductPrice: null,
    initialQuantity: null,
    expiredDay: null,
    manufactureName: "",
    linkProduct: "",
    imageProduct: "",
  });

  const handleSubmitCrowdFunding = () => {
    console.log(dataSubmit);
  };
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
            label="Max. Target Quantity"
            isRequired
            value={dataSubmit.targetQuantity}
            onChangeText={(e) =>
              setDataSubmit({ ...dataSubmit, targetQuantity: e })
            }
            keyboardType="numeric"
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
            label="Max. Crowd Funding Day"
            isRequired
            value={dataSubmit.expiredDay}
            onChangeText={(e) =>
              setDataSubmit({ ...dataSubmit, expiredDay: e })
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
          <FormItem
            label="Product Image Url"
            isRequired
            value={dataSubmit.imageProduct}
            onChangeText={(e) =>
              setDataSubmit({ ...dataSubmit, imageProduct: e })
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
