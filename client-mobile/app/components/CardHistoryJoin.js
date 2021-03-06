import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import NumberFormat from "react-number-format";
import moment from "moment";

export default function CardHistoryJoin({ data, onPress, route }) {
  const getColorStatus = (status) => {
    switch (status) {
      case "Open":
        return "#2563eb";
      case "Failed":
        return "#dc2626";
      case "Success":
        return "#16a34a";
    }
  };
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
          marginHorizontal: 10,
          borderRadius: 5,
          backgroundColor: "#fff",
        }}
      >
        {data?.CrowdFunding.productImage && (
          <Image
            source={{
              uri: data?.CrowdFunding.productImage,
            }}
            style={{
              height: 130,
              resizeMode: "contain",
              width: 120,
            }}
          />
        )}
        {!data?.CrowdFunding.productImage && (
          <View
            style={{
              height: 130,
              width: 120,
              flexDirection: "row",
              justifiyContent: "center",
              alignItems: "center",
              backgroundColor: "#94a3b8",
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                width: "100%",
              }}
            >
              Under review by admin
            </Text>
          </View>
        )}

        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              textAlign: "justify",
              fontWeight: "600",
              marginBottom: 8,
            }}
          >
            {data.CrowdFunding.productName}
          </Text>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ marginEnd: 20 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: "#94a3b8",
                }}
              >
                Product Price
              </Text>
              <NumberFormat
                value={data.CrowdFunding.finalProductPrice}
                displayType="text"
                thousandSeparator={true}
                prefix="IDR "
                renderText={(value) => {
                  return (
                    <Text
                      style={{
                        fontSize: 12,
                      }}
                    >
                      {value ? value : "Under Review"}
                    </Text>
                  );
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: "#94a3b8",
                }}
              >
                Date
              </Text>
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                {data.status === "Pending"
                  ? moment(data?.CrowdFunding.createdAt).format("Do MMMM YYYY")
                  : moment(data?.CrowdFunding.startDate).format("Do MMMM YYYY")}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 4,
            paddingHorizontal: 9,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 5,
            backgroundColor: getColorStatus(data.CrowdFunding.status),
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            {data.status === "open" ? "ongoing" : data.CrowdFunding.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
