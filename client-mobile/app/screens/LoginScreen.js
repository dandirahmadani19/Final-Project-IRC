import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { StackActions } from "@react-navigation/native";

import { LOGIN } from "../../query/user";
import { Form, FormItem } from "react-native-form-component";
import { isLogin } from "../../query/global";

export default function LoginScreen({ navigation, route }) {
  const [login, { loading, error, data }] = useMutation(LOGIN);
  const [flag, setFlag] = useState(0);

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  async function saveAccessToken(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const handleLogin = () => {
    if (!dataLogin.email || !dataLogin.password) {
      Alert.alert("WARNING", "Email And Password Is Required");
    } else {
      setFlag(1);
      login({ variables: { dataUser: dataLogin } });
    }
  };

  if (data && flag) {
    if (data.login.message) {
      setFlag(0);
      Alert.alert("Login Failed", data.login.message);
    } else {
      saveAccessToken("access_token", data.login.access_token);
      isLogin(true);
      if (route.name === "LoginScreen") {
        navigation.replace("Home");
      } else {
        navigation.jumpTo("HomeScreen");
      }
    }
  }

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
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "700",
            marginBottom: 30,
          }}
        >
          Login
        </Text>
        <Form
          onButtonPress={handleLogin}
          buttonStyle={{
            backgroundColor: "#2563eb",
            marginBottom: 20,
            marginTop: 5,
          }}
          buttonText="LOGIN"
        >
          <FormItem
            label="Email"
            isRequired
            value={dataLogin.email}
            onChangeText={(e) => setDataLogin({ ...dataLogin, email: e })}
            keyboardType="email-address"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
          />
          <FormItem
            label="Password"
            isRequired
            value={dataLogin.password}
            onChangeText={(e) => setDataLogin({ ...dataLogin, password: e })}
            keyboardType="default"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
            secureTextEntry={true}
          />
        </Form>
        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          Do not have an account ? Please register bellow
        </Text>
        <TouchableHighlight
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <View
            style={{
              paddingVertical: 12,
              backgroundColor: "#15803d",
              borderRadius: 7,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 15,
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              REGISTER
            </Text>
          </View>
        </TouchableHighlight>
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
