import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
  AsyncStorage,
} from "react-native";
import React, { useState } from "react";
import { Form, FormItem } from "react-native-form-component";
import { WebView } from "react-native-webview";
import { useMutation } from "@apollo/client";
import { GETURL, TOPUPBALANCE } from "../../query/payment";
import * as SecureStore from "expo-secure-store";

export default function TopUpBalance({ navigation }) {
  const [amount, setAmount] = useState();
  const [openWebView, setOpenWebView] = useState(false);
  const [url, setUrl] = useState();
  const [
    geturl,
    { loading: loadingGetUrl, error: errorGetUrl, data: dataGetUrl },
  ] = useMutation(GETURL);
  const [topup, { loading: loadingTopup, error: errorTopup, data: message }] =
    useMutation(TOPUPBALANCE);
  const handleTopUp = () => {
    if (!amount) {
      Alert.alert("Warning", "Amount Is Required");
    } else {
      SecureStore.getItemAsync("access_token").then((result) => {
        if (result) {
          geturl({
            variables: {
              dataBalance: { amount: +amount + 3000, access_token: result },
            },
          });
        }
      });
    }
    if (dataGetUrl) {
      setUrl(dataGetUrl.getUrl.redirect_url);
      setOpenWebView(true);
    }
  };

  const handleWebViewNavigationStateChange = (e) => {
    if (e.url.includes("&status_code=200&transaction_status=capture")) {
      Alert.alert("Success", "Topup Success");
      SecureStore.getItemAsync("access_token").then((result) => {
        if (result) {
          topup({
            variables: {
              dataBalance: { amount: +amount, access_token: result },
            },
          });
          setAmount("");
          setOpenWebView(false);
          navigation.navigate("JoinSuccess");
        }
      });
    }
    if (e.url.includes("error")) {
      setOpenWebView(false);
    }
  };

  if (openWebView) {
    return (
      <WebView
        source={{ uri: url }}
        // ref={(ref) => (webview = ref)}
        style={{ marginTop: 20 }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        // ref={(webView) => (this.webView = webView)}
      />
    );
  }

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
          <Text
            style={{
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            Note : Biaya Admin Sebesar Rp. 3000
          </Text>
        </Form>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: "#000",
    borderWidth: 0.5,
    marginBottom: 5,
  },
});
