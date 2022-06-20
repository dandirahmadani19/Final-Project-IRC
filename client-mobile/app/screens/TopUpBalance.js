import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import React, { useState } from 'react';
import { Form, FormItem } from 'react-native-form-component';
import { WebView } from 'react-native-webview';
import { useMutation } from '@apollo/client';
import { GETURL, TOPUPBALANCE } from '../../query/payment';
// import axios from 'axios';

// const baseUrl = 'https://8f85-114-122-14-122.ap.ngrok.io';

//pindahkan ke graphql

export default function TopUpBalance() {
  const [amount, setAmount] = useState();
  const [openWebView, setOpenWebView] = useState(false);
  const [url, setUrl] = useState();
  const [geturl, { loadingGetURl, errorGetUrl, dataGetUrl }] =
    useMutation(GETURL);
  const [topup, { loadingTopup, errorTopup, dataTopup }] =
    useMutation(TOPUPBALANCE);
  const handleTopUp = () => {
    console.log(amount);
    if (!amount) {
      Alert.alert('Warning', 'Amount Is Required');
    } else {
      geturl({ variables: { dataBalance: { amount } } });
      console.log(dataGetUrl);
      setUrl(dataGetUrl.getUrl.redirect_url);
      setOpenWebView(true);
    }
    // axios
    //   .post(`${baseUrl}/payment`, {
    //     addAmount: amount,
    //   })
    //   .then((res) => {
    //     console.log(res.data.redirect_url);
    //     setUrl(res.data.redirect_url);
    //     setOpenWebView(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // disini handle paymentnya
  };
  //payment controller dalam posisi hardcode jangan lupa
  //
  const handleWebViewNavigationStateChange = (e) => {
    if (e.url.includes('&status_code=200&transaction_status=capture')) {
      // push notif sukses
      Alert.alert('success', 'Topup Success');
      // axios
      //   .post(
      //     `${baseUrl}/payment/success`,
      //     {
      //       addAmount: amount,
      //     },
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //         // access_token: AsyncStorage.getItem('access_token'),
      //       },
      //     }
      //   )
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      TOPUPBALANCE({ variables: { dataBalance: { amount } } });
      setAmount('');
      setOpenWebView(false);
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
