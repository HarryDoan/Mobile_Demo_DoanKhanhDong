import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Animated,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils";
import { icon } from "../assets";

const Popup = ({ setIsShowPopup }: any) => {
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  useEffect(() => {
    if (setIsShowPopup) {
      Animated.spring(slideAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [setIsShowPopup, slideAnimation]);

  const closePopup = () => {
    Animated.timing(slideAnimation, {
      toValue: WINDOW_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsShowPopup(false);
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideAnimation }] },
      ]}>
      <View style={styles.content}>
        <Pressable onPress={closePopup} style={{ alignItems: "flex-end" }}>
          <Text>⨉</Text>
        </Pressable>

        <View>
          <View
            style={{
              position: "absolute",
              right: 100,
              zIndex: 2,
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: "orange",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text
              style={{
                fontSize: 30,
                color: "#FFFFFF",
                fontWeight: "600",
              }}>
              !
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              right: WINDOW_WIDTH * 0.44,
              top: WINDOW_WIDTH * 0.185,
              zIndex: 2,
              width: 15,
              height: 15,
              borderRadius: 15,
              backgroundColor: "orange",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <Image source={icon.map} style={styles.map} />
        </View>
        <Text style={styles.textContent}>
          You have not arrived back at Expo
        </Text>
        <Text style={styles.textSup}>
          Please report back at Foyer 1 to completed the job.
        </Text>

        <Pressable onPress={closePopup} style={styles.button}>
          <Text style={styles.buttonContent}>Ok</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default Popup;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    zIndex: 998,
    bottom: 0,
    height: WINDOW_HEIGHT * 1.2,
    width: WINDOW_WIDTH,
    alignSelf: "center",
    backgroundColor: "rgba(132, 125, 125, 0.5)",
    justifyContent: "flex-end",
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    height: WINDOW_HEIGHT / 1.25,
    width: WINDOW_WIDTH,
    backgroundColor: "#FFFFFF",
  },
  map: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    alignSelf: "center",
  },
  textContent: {
    width: WINDOW_WIDTH * 0.75,
    alignSelf: "center",
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
  },
  textSup: {
    marginTop: 10,
    width: WINDOW_WIDTH * 0.9,
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  button: {
    position: "absolute",
    bottom: WINDOW_HEIGHT * 0.25,
    alignSelf: "center",
    width: WINDOW_WIDTH * 0.9,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    fontSize: 18,
    fontWeight: "400",
    color: "#FFFFFF",
  },
});
