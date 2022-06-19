import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';
import { Form, FormItem } from 'react-native-form-component';
import { WebView } from 'react-native-webview';
import axios from 'axios';

export default function TopUpBalance() {
  const [amount, setAmount] = useState();
  const [openWebView, setOpenWebView] = useState(false);
  const [url, setUrl] = useState();
  // const webview = null;
  const handleTopUp = () => {
    console.log(amount);
    axios
      .post('https://c0c0-149-113-153-48.ap.ngrok.io/payment', {
        addAmount: amount,
      })
      .then((res) => {
        console.log(res.data.redirect_url);
        setUrl(res.data.redirect_url);
        setOpenWebView(true);
      })
      .catch((err) => {
        console.log(err);
      });
    // disini handle paymentnya
  };
  //note promise handle berjalan 2 kali
  //munkin penyebab setOpenView tidak di trigger
  //payment controller dalam posisi hardcode jangan lupa
  //
  const handleWebViewNavigationStateChange = (e) => {
    if (e.url.includes('&status_code=200&transaction_status=capture')) {
      // push notif sukses
      axios
        .post('https://c0c0-149-113-153-48.ap.ngrok.io/payment/success', {
          addAmount: Number(amount),
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          e.stop;
          setOpenWebView(false);
          setAmount('');
          // kembali ke home
        });
    }
    if (e.url.includes('error')) {
      // push notif error

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
        backgroundColor: '#fff',
        height: '100%',
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginTop: 20,
          borderRadius: 10,
          width: '100%',
        }}
      >
        <Form
          onButtonPress={handleTopUp}
          buttonStyle={{
            backgroundColor: '#15803d',
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
    borderColor: '#000',
    borderWidth: 0.5,
  },
});
