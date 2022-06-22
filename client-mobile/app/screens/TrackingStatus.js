import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";

export default function TrackingStatus() {
  const trackStatus = [
    {
      status: "On Delivery",
      description:
        "Sudah Dalam Perjalanan kkdmdkffjdkfd fkdfjdkfdf dfdjfkdfjdkfd fdfjdfj",
    },
    {
      status: "Arrived",
      description: "Sudah Dalam Perjalanan",
    },
    {
      status: "On Shipping",
      description: "Sudah Dalam Perjalanan",
      createdAt: "2022-06-22T08:01:49.333Z",
    },
    {
      status: "On Proccess",
      description: "Sudah Dalam Perjalanan",
      createdAt: "2022-06-18T08:01:49.333Z",
    },
  ];

  return (
    <View style={{ backgroundColor: "#e2e8f0", flex: 1 }}>
      <View
        style={{
          paddingHorizontal: "15%",
          flexDirection: "row",
          backgroundColor: "#fff",
          paddingTop: 50,
        }}
      >
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor:
              trackStatus[trackStatus.length - 1].status === "On Shipping"
                ? "green"
                : "#94a3b8",
            paddingBottom: 30,
            width: "33%",
          }}
        >
          <MaterialCommunityIcons
            name="package-variant"
            size={50}
            color="green"
            style={{
              left: -25,
            }}
          />
          <View
            style={{
              height: 22,
              width: 22,
              backgroundColor: "green",
              borderRadius: 50,
              position: "absolute",
              bottom: -11,
              left: -11,
            }}
          />
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            // borderLeftWidth: 1,
            borderBottomColor:
              trackStatus[trackStatus.length - 1].status === "On Shipping"
                ? "green"
                : "#94a3b8",
            paddingBottom: 30,
            width: "33%",
          }}
        >
          <FontAwesome5
            name="shipping-fast"
            size={40}
            color={
              trackStatus[trackStatus.length - 1].status === "On Shipping"
                ? "green"
                : "#94a3b8"
            }
            style={{
              left: -20,
            }}
          />
          <View
            style={{
              height: 22,
              width: 22,
              backgroundColor:
                trackStatus[trackStatus.length - 1].status === "On Shipping"
                  ? "green"
                  : "#94a3b8",
              borderRadius: 50,
              position: "absolute",
              bottom: -11,
              left: -11,
            }}
          />
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            // borderLeftWidth: 1,
            borderBottomColor: "#94a3b8",
            paddingBottom: 30,
            flexDirection: "row",
            width: "33%",
          }}
        >
          <FontAwesome5
            name="plane-arrival"
            size={40}
            color="#94a3b8"
            style={{
              left: -20,
            }}
          />
          <MaterialIcons
            name="delivery-dining"
            size={54}
            color="#94a3b8"
            style={{
              right: -27,
            }}
          />

          <View
            style={{
              height: 22,
              width: 22,
              backgroundColor: "#94a3b8",
              borderRadius: 50,
              position: "absolute",
              bottom: -11,
              left: -11,
            }}
          />
          <View
            style={{
              height: 22,
              width: 22,
              backgroundColor: "#94a3b8",
              borderRadius: 50,
              position: "absolute",
              bottom: -11,
              right: -11,
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 50,
          backgroundColor: "#fff",
          paddingVertical: 30,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "800",
            fontStyle: "italic",
          }}
        >
          {trackStatus[0].status}
        </Text>
      </View>
      <View
        style={{
          paddingVertical: 20,
          backgroundColor: "#fff",
          marginTop: 3,
          paddingHorizontal: 30,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "700" }}>Status Tracking</Text>
      </View>
      <View
        style={{
          paddingVertical: 40,
          backgroundColor: "#fff",
          marginTop: 3,
          paddingHorizontal: 30,
        }}
      >
        {trackStatus.map((e, i) => {
          return (
            <View
              key={i}
              style={{
                borderLeftWidth: 2,
                borderLeftColor: i === 0 ? "green" : "#94a3b8",
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: 15,
                  top: -22,
                }}
              >
                <Text style={{ marginEnd: 11 }}>{e.status}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#94a3b8",
                  }}
                >
                  {moment(e.createdAt).format("dddd, DD MMMM YYYY")}
                </Text>
              </View>
              <Text style={{ top: -20, fontSize: 13, color: "#94a3b8" }}>
                {e.description}
              </Text>
              <View
                style={{
                  height: 18,
                  width: 18,
                  backgroundColor: i === 0 ? "green" : "#94a3b8",
                  borderRadius: 50,
                  position: "absolute",
                  top: -9,
                  left: -10,
                }}
              />
            </View>
          );
        })}
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({});
