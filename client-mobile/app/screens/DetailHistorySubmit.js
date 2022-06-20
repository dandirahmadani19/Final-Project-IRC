import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import NumberFormat from "react-number-format";
import moment from "moment";

export default function DetailHistorySubmit({ route }) {
  const data = route.params.data;
  console.log(data);
  return (
    <View style={{ backgroundColor: "#e2e8f0", flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerSection}>Crowd Funding Success</Text>
      </View>
      <View style={[styles.container, { flexDirection: "row" }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.textLeftSide}>Applicant`s Name</Text>
          <Text style={styles.textLeftSide}>Submission Date</Text>
          <Text style={styles.textLeftSide}>Users Join</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.textRightSide}>
            {data.firstName} {data.lastName}
          </Text>
          <Text style={styles.textRightSide}>
            {moment(data.createdAt).format("dddd Do MMMM YYYY")}
          </Text>
          <Text style={styles.textRightSide}>
            {data.CrowdFundingProducts.length + 1} People
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.headerSection}>Detail Product</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <Image
            source={{ uri: data.productImage }}
            style={{
              width: 80,
              height: 80,
              resizeMode: "contain",
              marginEnd: 10,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 11, marginBottom: 5, textAlign: "justify" }}
            >
              {data.productName}
            </Text>
            <Text style={{ fontSize: 11, color: "#64748b" }}>
              {data.initialQuantity} x IDR {data.finalProductPrice}
            </Text>
          </View>
        </View>
      </View>
      {data.status !== "Pending" && (
        <View>
          <View style={styles.container}>
            <Text style={styles.headerSection}>Payment Detail</Text>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.textLeftSide}>Product Price</Text>
                <Text style={styles.textLeftSide}>Quantity</Text>
                <Text
                  style={
                    ([styles.textLeftSide],
                    { fontWeight: "700", marginTop: 10 })
                  }
                >
                  Total Price
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <NumberFormat
                  value={data.finalProductPrice}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="IDR "
                  renderText={(value) => (
                    <Text style={styles.textRightSide}>{value}</Text>
                  )}
                />
                <Text style={styles.textRightSide}>
                  {data.initialQuantity} pcs
                </Text>
                <NumberFormat
                  value={data.finalProductPrice * data.initialQuantity}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="IDR "
                  renderText={(value) => (
                    <Text
                      style={{
                        fontWeight: "700",
                        marginTop: 10,
                        textAlign: "right",
                      }}
                    >
                      {value}
                    </Text>
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginTop: 5,
  },
  headerSection: {
    fontSize: 14,
    fontWeight: "700",
  },
  textRightSide: {
    textAlign: "right",
    paddingVertical: 5,
    fontSize: 12,
  },
  textLeftSide: {
    textAlign: "left",
    paddingVertical: 5,
    fontSize: 12,
    color: "#64748b",
  },
});
