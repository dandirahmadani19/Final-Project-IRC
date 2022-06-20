import * as React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "./app/screens/DetailScreen";
import FormJoin from "./app/screens/FormJoin";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import MyDrawer from "./app/navigation/MyDrawer";
import DetailHistorySubmit from "./app/screens/DetailHistorySubmit";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useState, useRef, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { isLogin } from "./query/global";
import { useNavigation } from "@react-navigation/native";
import ConfirmationSubmit from "./app/screens/ConfirmationSubmit";

const Stack = createNativeStackNavigator();

SecureStore.getItemAsync("access_token").then((result) => {
  if (result) {
    isLogin(true);
  } else {
    isLogin(false);
  }
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#15803d",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={MyDrawer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen
            name="FormJoin"
            component={FormJoin}
            options={{
              title: "Form Join",
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailHistorySubmit"
            component={DetailHistorySubmit}
            options={{
              title: "Detail History Submit",
            }}
          />
          <Stack.Screen
            name="ConfirmationSubmit"
            component={ConfirmationSubmit}
            options={{
              title: "Confirmation",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
