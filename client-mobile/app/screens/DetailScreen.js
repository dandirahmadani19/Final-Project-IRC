import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  ProgressBarAndroid,
} from "react-native";
import React from "react";
import { Entypo, FontAwesome5 } from "@expo/vector-icons/";
import NumberFormat from "react-number-format";
import moment from "moment";

export default function DetailScreen({ route, navigation }) {
  const id = route.params.id;
  const data = route.params.data;

  //   const data = {
  //     id: 1,
  //     imageProduct:
  //       "https://s.alicdn.com/@sc04/kf/H8d66d54811d44603a199cfbcf6ac9439r.jpg_960x960.jpg",
  //     productName:
  //       "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
  //     userAmount: 4,
  //     currentQuantity: 20,
  //     targetQuantity: 203,
  //     userName: "James Bond",
  //     productPrice: 120000,
  //     startDate: "2022-06-07T16:14:16.940Z",
  //     expiredDay: 11,
  //   };

  const getDaysToGo = () => {
    const endDate = moment(data.startDate)
      .add(data.expiredDay, "days")
      .format("YYYYMMDD");
    return moment(endDate).endOf("day").fromNow();
  };

  const getEndDate = () => {
    return moment(data.startDate)
      .add(data.expiredDay, "days")
      .format("Do MMMM YYYY");
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

  const handleOnPress = (e) => {
    navigation.navigate("FormJoin", { data });
  };
  return (
    <ScrollView>
      <Image
        source={{
          uri: data.imageProduct,
        }}
        style={{
          width: "100%",
          height: 320,
        }}
      />
      <View
        style={{
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            textAlign: "justify",
            marginTop: 10,
            fontFamily: "sans-serif-condensed",
          }}
        >
          {data.productName}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          <NumberFormat
            value={data.productPrice}
            displayType="text"
            thousandSeparator={true}
            prefix="Rp. "
            renderText={(value) => (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#15803d",
                  marginEnd: 5,
                }}
              >
                {value}
              </Text>
            )}
          />
          <Text
            style={{
              fontSize: 11,
              marginBottom: 4,
              color: "#64748b",
            }}
          >
            / pcs
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 17,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgrG3dj6no0U4-cAbBsamUwlHWl5Rwis611g&usqp=CAU",
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                marginEnd: 10,
              }}
            />
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#64748b",
                  fontSize: 12,
                }}
              >
                Submit By
              </Text>
              <Text
                style={{
                  fontWeight: "700",
                }}
              >
                {data.userName}
              </Text>
            </View>
          </View>
          {isEndDate() && (
            <View
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                backgroundColor: "#94a3b8",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "700",
                  letterSpacing: 1.5,
                }}
              >
                Closed
              </Text>
            </View>
          )}
          {!isEndDate() && (
            <TouchableHighlight onPress={handleOnPress}>
              <View
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  backgroundColor: "#16a34a",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="squared-plus" color="#fff" size={20} />
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "700",
                      letterSpacing: 1.5,
                      marginStart: 7,
                    }}
                  >
                    JOIN
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        </View>
        <Text
          style={{
            fontFamily: "sans-serif-condensed",
            fontSize: 13,
            marginBottom: 5,
            marginTop: 15,
          }}
        >
          Progress Crowd Funding
        </Text>
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
              : ((data.currentQuantity * 100) / data.targetQuantity).toFixed(2)}
            %
          </Text>
        </View>
        <View
          style={{
            marginVertical: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            paddingHorizontal: 15,
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
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <FontAwesome5 name="money-bill-wave" color="#15803d" size={25} />
          <NumberFormat
            value={data.productPrice * data.currentQuantity}
            displayType="text"
            thousandSeparator={true}
            prefix="Rp. "
            renderText={(value) => (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#15803d",
                  marginHorizontal: 8,
                }}
              >
                {value}
              </Text>
            )}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <Text
              style={{
                color: "#94a3b8",
                fontSize: 12,
                marginBottom: 2,
              }}
            >
              Total Price Funded
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: "#64748b",
            marginTop: 10,
            fontFamily: "sans-serif-condensed",
          }}
        >
          Crowd Funding {isEndDate() ? "Has Finished " : "Will End "}
          {getDaysToGo()} On {getEndDate()}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
