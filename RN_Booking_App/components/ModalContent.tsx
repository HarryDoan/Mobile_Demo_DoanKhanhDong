import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils";
import SlidingButton from "./SlidingButton";
import HeaderModalContent from "./HeaderModalContent";
import { SafeAreaView } from "react-native-safe-area-context";
import { icon } from "../assets";
import Popup from "./Popup";
interface ModalContentProps {
  isChange: boolean;
}
const HEIGHT_BETWEEN_TWO_ADDRESS = 100;

const ModalContent = ({ isChange }: ModalContentProps) => {
  const [isShowPopup, setIsShowPopup] = useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: !isChange ? "transparent" : "#FFFFFF",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}>
      <View style={styles.container}>
        <HeaderModalContent isChange={isChange} />

        <View
          style={{
            height: WINDOW_HEIGHT,
            backgroundColor: "white",
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <View
            style={{
              flexDirection: "row",
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: "#1168E9",
                marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Image
                source={icon.check}
                style={{
                  width: 27,
                  height: 27,
                  resizeMode: "stretch",
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                color: "#3872CA",
                fontWeight: "600",
              }}>
              STANDARD RIDE
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 18,
              paddingVertical: 25,
              flexDirection: "row",
            }}>
            <View>
              <Image
                source={icon.travel}
                style={{
                  width: 15,
                  height: 20,
                  resizeMode: "cover",
                }}
              />
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 6,
                  width: 2,
                  height: HEIGHT_BETWEEN_TWO_ADDRESS,
                  borderRadius: 15,
                  backgroundColor: "#1168E9",
                }}
              />
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 15,
                  backgroundColor: "#1168E9",
                }}
              />
            </View>

            <View
              style={{
                paddingHorizontal: 20,
              }}>
              <View
                style={{
                  marginTop: -5,
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "700",
                  }}>
                  Expo Hall 7
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#737C8C",
                    fontWeight: "400",
                    paddingVertical: 3,
                  }}>
                  Expo Hall 7, Singapore
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#60BC40",

                    fontWeight: "500",
                  }}>
                  Picked up
                </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  paddingHorizontal: 20,
                  top: HEIGHT_BETWEEN_TWO_ADDRESS * 1.3,
                  zIndex: 2,
                  width: WINDOW_WIDTH * 0.75,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#0390CC",
                    fontWeight: "500",
                  }}>
                  6:06pm
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "700",
                  }}>
                  Far East Plaza
                </Text>
                <Text
                  style={{
                    lineHeight: 25,
                    fontSize: 16,
                    color: "#737C8C",
                    fontWeight: "400",
                    paddingVertical: 3,
                  }}>
                  14 Scotts Road, Orchard, Singapore, Singapore 228213
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#60BC40",

                    fontWeight: "500",
                  }}>
                  Dropped - off
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: HEIGHT_BETWEEN_TWO_ADDRESS * 1.3,
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}>
            <Text
              style={{
                fontSize: 16,
                color: "#898C8F",
                fontWeight: "400",
              }}>
              Job Date
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontWeight: "900",
              }}>
              12/12/2023
            </Text>
          </View>

          <SlidingButton
            setIsShowPopup={setIsShowPopup}
            isShowPopup={isShowPopup}
          />
          {isShowPopup && <Popup setIsShowPopup={setIsShowPopup} />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ModalContent;

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // bottom: 0,
    // zIndex: 2,
    // height: "50%",
    // width: "100%",
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
  },
});
