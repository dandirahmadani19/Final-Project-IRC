import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React from "react";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { GET_STATUS_TRACKING } from "../../query/crowdFunding";
import client from "../../config/apolloClient";

export default function TrackingStatus({ route }) {
  const { loading, error, data } = useQuery(GET_STATUS_TRACKING, {
    variables: { idCrowdFunding: +route.params.id },
  });

  client.refetchQueries({
    include: [GET_STATUS_TRACKING],
  });

  const trackStatus = data?.getStatusTracking
    ? data?.getStatusTracking
    : [{ status: "", description: "" }];

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

  const check = (status) => {
    return trackStatus.some((e) => {
      return e.status === status;
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "#e2e8f0", flex: 1 }}>
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
            borderBottomColor: check("On Shipping") ? "green" : "#94a3b8",
            paddingBottom: 30,
            width: "33%",
          }}
        >
          <View
            style={{
              left: -33,
              position: "absolute",
              backgroundColor: "green",
              borderRadius: 50,
              height: 60,
              width: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="package-variant"
              size={30}
              color="#fff"
            />
          </View>
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
            borderBottomColor: check("Arrived") ? "green" : "#94a3b8",
            paddingBottom: 30,
            width: "33%",
          }}
        >
          <View
            style={{
              left: -31,
              position: "absolute",
              backgroundColor: check("On Shipping") ? "green" : "#94a3b8",
              borderRadius: 50,
              height: 60,
              width: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5 name="shipping-fast" size={25} color="#fff" />
          </View>

          <View
            style={{
              height: 22,
              width: 22,
              backgroundColor: check("On Shipping") ? "green" : "#94a3b8",
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
            borderBottomColor: check("On Delivery") ? "green" : "#94a3b8",
            paddingBottom: 30,
            flexDirection: "row",
            width: "33%",
          }}
        >
          <View
            style={{
              left: -32,
              position: "absolute",
              backgroundColor: check("Arrived") ? "green" : "#94a3b8",
              borderRadius: 50,
              height: 60,
              width: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5 name="plane-arrival" size={25} color="#fff" />
          </View>

          <View
            style={{
              right: -63,
              backgroundColor: check("On Delivery") ? "green" : "#94a3b8",
              borderRadius: 50,
              height: 60,
              width: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="delivery-dining" size={38} color="#fff" />
          </View>

          <View
            style={{
              height: 22,
              width: 22,
              backgroundColor: check("Arrived") ? "green" : "#94a3b8",
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
              backgroundColor: check("On Delivery") ? "green" : "#94a3b8",
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
