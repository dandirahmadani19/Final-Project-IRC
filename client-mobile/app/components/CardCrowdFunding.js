import {
  StyleSheet,
  Text,
  View,
  Image,
  ProgressBarAndroid,
  TouchableHighlight,
} from "react-native";
import React from "react";

export default function CardCrowdFunding({ data, onPress }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="#cbd5e1"
      activeOpacity={0.9}
    >
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 8,
          marginHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <Image
          source={{
            uri: data.imageProduct,
          }}
          style={{
            width: "100%",
            height: 250,
            resizeMode: "cover",
          }}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
            textAlign: "justify",
            marginVertical: 10,
          }}
        >
          {data.productName}
        </Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
          color="#15803d"
        />
        <View
          style={{
            marginVertical: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                color: "#94a3b8",
                fontSize: 11,
                marginBottom: 5,
              }}
            >
              Quantity Funded
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "900",
                  color: "#15803d",
                  marginEnd: 5,
                }}
              >
                {data.currentQuantity}
              </Text>
              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: 11,
                }}
              >
                Pcs
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: "#94a3b8",
                fontSize: 11,
                marginBottom: 5,
              }}
            >
              Target Quantity
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "900",
                  color: "#15803d",
                  marginEnd: 5,
                }}
              >
                {data.targetQuantity}
              </Text>
              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: 11,
                }}
              >
                Pcs
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: "#94a3b8",
                fontSize: 11,
                marginBottom: 5,
              }}
            >
              User Join
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "900",
                  color: "#15803d",
                  marginEnd: 5,
                }}
              >
                {data.userAmount}
              </Text>
              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: 11,
                }}
              >
                People
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: "#94a3b8",
                fontSize: 11,
                marginBottom: 5,
              }}
            >
              Until
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "900",
                  color: "#15803d",
                  marginEnd: 5,
                }}
              >
                {data.daysToGo}
              </Text>
              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: 11,
                }}
              >
                Days To Go
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({});
