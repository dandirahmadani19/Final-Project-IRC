import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import NumberFormat from "react-number-format";
import moment from "moment";

export default function CardHistoryCrowdFunding({ data, onPress }) {
  const getColorStatus = (status) => {
    switch (status) {
      case "Open":
        return "#2563eb";
      case "Failed":
        return "#dc2626";
      case "Success":
        return "#16a34a";
      case "Pending":
        return "#facc15";
      case "Deny":
        return "#5b21b6";
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
        {data.productImage && (
          <Image
            source={{
              uri: data.productImage,
            }}
            style={{
              height: 130,
              resizeMode: "contain",
              width: 120,
            }}
          />
        )}
        {!data.productImage && (
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
              {data.status === "Pending"
                ? "Under review by admin"
                : "Rejected by Admin"}
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
            {data.productName}
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
                value={data.finalProductPrice}
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
                      {value
                        ? value
                        : data.status === "Pending"
                        ? "Under Review"
                        : "Rejected by Admin"}
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
                {data.status === "Pending" || data.status === "Deny"
                  ? moment(data.createdAt).format("Do MMMM YYYY")
                  : moment(data.startDate).format("Do MMMM YYYY")}
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
            backgroundColor: getColorStatus(data.status),
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
            {data.status === "open" ? "ongoing" : data.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
