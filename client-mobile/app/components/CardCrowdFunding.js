import {
  StyleSheet,
  Text,
  View,
  Image,
  ProgressBarAndroid,
  TouchableOpacity,
} from "react-native";
import React from "react";
import NumberFormat from "react-number-format";
import moment from "moment";

export default function CardCrowdFunding({ data, onPress }) {
  const getDaysToGo = () => {
    const endDate = moment(data.startDate)
      .add(data.expiredDay, "days")
      .format("YYYYMMDD");
    return moment(endDate).endOf("day").fromNow();
  };

  const isEndDate = () => {
    const endDate = new Date(
      moment(data.startDate).add(data.expiredDay, "days").format("YYYY-MM-DD")
    );
    if (moment(new Date()).isBefore(endDate)) {
      return false;
    }
    return true;
  };
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
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
            uri: data.productImage,
          }}
          style={{
            width: "100%",
            height: 280,
            resizeMode: "cover",
          }}
        />
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              textAlign: "justify",
              marginTop: 10,
            }}
          >
            {data.productName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
              marginBottom: 25,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <NumberFormat
                value={data.finalProductPrice}
                displayType="text"
                thousandSeparator={true}
                prefix="Rp "
                renderText={(value) => (
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "700",
                      color: "#64748b",
                      marginEnd: 5,
                    }}
                  >
                    {value}
                  </Text>
                )}
              />
              <Text
                style={{
                  fontSize: 10,
                  marginBottom: 1,
                  color: "#64748b",
                }}
              >
                / pcs
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: "#15803d",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 11,
                }}
              >
                {data.categoryProduct}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={data.currentQuantity / data.targetQuantity}
              color="#15803d"
              style={{
                flex: 1,
                marginEnd: 10,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: "#15803d",
              }}
            >
              {(data.currentQuantity * 100) % data.targetQuantity === 0
                ? (data.currentQuantity * 100) / data.targetQuantity
                : ((data.currentQuantity * 100) / data.targetQuantity).toFixed(
                    2
                  )}
              %
            </Text>
          </View>

          <View
            style={{
              marginVertical: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
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
                {isEndDate() ? "Has Finished " : "Will End "}
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
                  {getDaysToGo()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
