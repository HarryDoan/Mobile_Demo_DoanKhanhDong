import { View, Text, Image } from "react-native";
import React from "react";
import { icon } from "../assets";

const HeaderModalContent = ({ isChange }: any) => {
  return (
    <View>
      {isChange ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: "#000000",
              fontWeight: "600",
              marginBottom: 10,
            }}>
            LY-4b3dec
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 15,
              borderBottomWidth: 2,
              width: "100%",
              justifyContent: "center",
            }}>
            <Text
              style={{
                fontSize: 24,
                color: "#000000",
                fontWeight: "400",
                marginRight: 10,
              }}>
              $65.00
            </Text>
            <Image
              source={icon.sync}
              style={{
                width: 22,
                height: 22,
                transform: [{ rotate: "90deg" }],
              }}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 23,
            paddingVertical: 15,
            backgroundColor: isChange ? "red" : "#1F2630",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Text
              style={{
                fontSize: 28,
                color: "white",
                fontWeight: "600",
                marginRight: 20,
              }}>
              12
            </Text>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontWeight: "300",
                }}>
                December
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#737C8C",
                  fontWeight: "300",
                }}>
                N95899
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 24,
              color: "white",
              fontWeight: "300",
            }}>
            $65.00
          </Text>
        </View>
      )}
    </View>
  );
};

export default HeaderModalContent;
