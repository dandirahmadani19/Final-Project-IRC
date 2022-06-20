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
import * as Notifications from 'expo-notifications';
import {useState,useRef,useEffect} from 'react'
import * as SecureStore from "expo-secure-store";
import { isLogin } from "./query/global";

const Stack = createNativeStackNavigator();

SecureStore.getItemAsync("access_token").then((result) => {
  if (result) {
    isLogin(true);
  } else {
    isLogin(false);
  }

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),

});

export default function App() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    //nge get token dan nge set token
    /* registerForPushNotificationsAsync().then(token => setExpoPushToken(token)); */

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const {data} = response.notification.request.content.data
      if(data){
        navigation.navigate(data)
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


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
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
