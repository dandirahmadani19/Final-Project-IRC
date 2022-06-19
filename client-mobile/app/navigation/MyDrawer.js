import { TouchableOpacity } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomDrawerContent from "./CustomDrawerContent";
import HomeScreen from "../screens/HomeScreen";
import TopUpBalance from "../screens/TopUpBalance";
import SubmitCrowFunding from "../screens/SubmitCrowFunding";
import LoginScreen from "../screens/LoginScreen";
import HistoryJoin from "../screens/HistoryJoin";
import HistorySubmit from "../screens/HistorySubmit";
import { isLogin } from "../../query/global";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="HomeScreen"
      screenOptions={{
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: "#15803d",
        headerTitleStyle: {
          marginLeft: -20,
        },
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#15803d",
        },
        drawerType: "back",
      }}
      drawerContent={(props) => {
        return <CustomDrawerContent {...props} />;
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Crowd Funding List",
        }}
      />
      <Drawer.Screen
        name="TopUpBalance"
        component={TopUpBalance}
        options={{
          title: "Top Up Balance",
          drawerItemStyle: {
            display: isLogin() ? "flex" : "none",
          },
        }}
      />
      <Drawer.Screen
        name="SubmitCrowdFunding"
        component={SubmitCrowFunding}
        options={{
          title: "Submit Crowd Funding",
          drawerItemStyle: {
            display: isLogin() ? "flex" : "none",
          },
        }}
      />
      <Drawer.Screen
        name="HistorySubmit"
        component={HistorySubmit}
        options={{
          title: "History Submit CF",
          drawerItemStyle: {
            display: isLogin() ? "flex" : "none",
          },
        }}
      />
      <Drawer.Screen
        name="HistoryJoin"
        component={HistoryJoin}
        options={{
          title: "History Join CF",
          drawerItemStyle: {
            display: isLogin() ? "flex" : "none",
          },
        }}
      />

      <Drawer.Screen
        name="LoginSreenDrawer"
        component={LoginScreen}
        options={{
          title: "Login",
          headerShown: false,
          drawerItemStyle: {
            display: isLogin() ? "none" : "flex",
          },
        }}
      />
    </Drawer.Navigator>
  );
}
