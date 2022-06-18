import { TouchableOpacity } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomDrawerContent from "./CustomDrawerContent";
import HomeScreen from "../screens/HomeScreen";
import TopUpBalance from "../screens/TopUpBalance";
import SubmitCrowFunding from "../screens/SubmitCrowFunding";
import LoginScreen from "../screens/LoginScreen";
import { isLogin } from "../../query/global";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  const [navigate, setNavigate] = React.useState({});
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="HomeScreen"
      screenOptions={{
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: "#15803d",
        headerTitleStyle: {
          marginLeft: -15,
          color: "#fff",
        },
        headerStyle: {
          backgroundColor: "#15803d",
        },
        drawerType: "back",
        headerLeft: () => (
          <TouchableOpacity onPress={(e) => navigate.toggleDrawer()}>
            <Ionicons
              name="menu"
              color="#fff"
              size={30}
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        ),
      }}
      drawerContent={(props) => {
        setNavigate(props.navigation);
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
