import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Form, FormItem } from "react-native-form-component";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../query/user";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(false);
  const [register, { loading, error, data }] = useMutation(REGISTER);
  const [dataRegister, setDataRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const handleRegister = () => {
    register({ variables: { dataUser: dataRegister } });
    setFlag(true);
  };
  if (data?.register.message === "Email has been registered" && flag) {
    setFlag(false);
    setMessage("Email has been registered");
    setModalVisible(true);
  }
  if (data?.register.message === "User created successfully" && flag) {
    setMessage("Add New Account Successfully");
    setModalVisible(true);
    setFlag(false);
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
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
      style={{}}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            {message === "Email has been registered" && (
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons name="close-circle-outline" size={25} />
              </Pressable>
            )}
            {message === "Add New Account Successfully" && (
              <Pressable
                style={styles.buttonBackToLogin}
                onPress={() => {
                  navigation.replace("LoginScreen");
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>
                  Back To Login
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
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
          Register
        </Text>
        <Form
          onButtonPress={handleRegister}
          buttonStyle={{
            backgroundColor: "#15803d",
            marginBottom: 20,
            marginTop: 5,
          }}
          buttonText="REGISTER"
        >
          <FormItem
            label="First Name"
            isRequired
            value={dataRegister.firstName}
            onChangeText={(e) =>
              setDataRegister({ ...dataRegister, firstName: e })
            }
            keyboardType="default"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
          />
          <FormItem
            label="Last Name"
            isRequired
            value={dataRegister.lastName}
            onChangeText={(e) =>
              setDataRegister({ ...dataRegister, lastName: e })
            }
            keyboardType="default"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
          />
          <FormItem
            label="Email"
            isRequired
            value={dataRegister.email}
            onChangeText={(e) => setDataRegister({ ...dataRegister, email: e })}
            keyboardType="email-address"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
          />
          <FormItem
            label="Password"
            isRequired
            value={dataRegister.password}
            onChangeText={(e) =>
              setDataRegister({ ...dataRegister, password: e })
            }
            keyboardType="default"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
            secureTextEntry={true}
          />
          <FormItem
            label="Phone Number"
            isRequired
            value={dataRegister.phoneNumber}
            onChangeText={(e) =>
              setDataRegister({ ...dataRegister, phoneNumber: e })
            }
            keyboardType="numeric"
            floatingLabel={true}
            errorBorderColor="#dc2626"
            style={styles.inputStyle}
          />
          <FormItem
            label="Address"
            isRequired
            textArea={true}
            value={dataRegister.address}
            onChangeText={(e) =>
              setDataRegister({ ...dataRegister, address: e })
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
  centeredView: {
    flex: 1,
    marginTop: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonBackToLogin: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "red",
  },
  buttonClose: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
});
