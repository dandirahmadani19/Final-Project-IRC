import * as React from "react";
import { View, Text, Image } from "react-native";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./app/screens/HomeScreen";
import DetailScreen from "./app/screens/DetailScreen";
import FormJoin from "./app/screens/FormJoin";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import * as SecureStore from "expo-secure-store";
import { isLogin } from "./query/global";
import NumberFormat from "react-number-format";
import TopUpBalance from "./app/screens/TopUpBalance";
import SubmitCrowFunding from "./app/screens/SubmitCrowFunding";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
  return (
    <>
      <View
        style={{
          backgroundColor: "#15803d",
          height: 200,
          marginBottom: -25,
          paddingTop: 50,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgrG3dj6no0U4-cAbBsamUwlHWl5Rwis611g&usqp=CAU",
            }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 50,
              marginEnd: 10,
            }}
          />
          <View>
            <Text style={{ fontSize: 14, fontWeight: "800", color: "#fff" }}>
              Dandi Rahmadani
            </Text>
            <Text style={{ fontSize: 11, fontWeight: "300", color: "#cbd5e1" }}>
              dandirahmadani@gmail.com
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: "#cbd5e1",
                marginTop: 10,
              }}
            >
              08789809876
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 12,
            color: "#cbd5e1",
            marginTop: 20,
            marginBottom: 5,
          }}
        >
          Balance
        </Text>
        <NumberFormat
          value={1200000}
          displayType="text"
          thousandSeparator={true}
          prefix="Rp. "
          renderText={(value) => (
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "#fff",
              }}
            >
              {value}
            </Text>
          )}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <DrawerItem
          label="Logout"
          onPress={async () => {
            await SecureStore.deleteItemAsync("access_token");
            props.navigation.replace("Home");
            isLogin(false);
          }}
          style={
            {
              // display: isLogin() ? "flex" : "none",
            }
          }
        />
      </DrawerContentScrollView>
    </>
  );
}

function MyDrawer() {
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
        headerLeft: (props) => (
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
        }}
      />
      <Drawer.Screen
        name="TopUpBalance"
        component={TopUpBalance}
        options={{
          title: "Top Up Balance",
        }}
      />
      <Drawer.Screen
        name="LoginSreenDrawer"
        component={LoginScreen}
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
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
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
