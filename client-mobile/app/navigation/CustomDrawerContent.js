import { Text, View, Image } from "react-native";
import NumberFormat from "react-number-format";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import * as SecureStore from "expo-secure-store";
import { isLogin } from "../../query/global";
import { ActivityIndicator } from "react-native";

export default function CustomDrawerContent(props) {
  return (
    <>
      <View
        style={{
          backgroundColor: "#15803d",
          height: isLogin() ? 200 : 120,
          marginBottom: -25,
          paddingTop: 50,
          paddingHorizontal: 15,
        }}
      >
        {isLogin() && (
          <View>
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
                <Text
                  style={{ fontSize: 14, fontWeight: "800", color: "#fff" }}
                >
                  Dandi Rahmadani
                </Text>
                <Text
                  style={{ fontSize: 11, fontWeight: "300", color: "#cbd5e1" }}
                >
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
              Your Balance
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
        )}
        {!isLogin() && (
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Import Require Community
          </Text>
        )}
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
          style={{
            display: isLogin() ? "flex" : "none",
          }}
        />
      </DrawerContentScrollView>
    </>
  );
}
