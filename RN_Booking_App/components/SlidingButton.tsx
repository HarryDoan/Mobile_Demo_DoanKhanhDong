import React, { useRef, useState, useEffect } from "react";
import {
  View,
  PanResponder,
  Animated,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils";
import { icon } from "../assets";
import Popup from "./Popup";

const WIDTH_LIMIT = WINDOW_WIDTH * 0.9 - 45;
const COMPLETED_TEXT = "Completed";

const SlidingButton = ({ setIsShowPopup, isShowPopup }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timer | null>(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const animatedColors = COMPLETED_TEXT.split("").map(
    () => useRef(new Animated.Value(0)).current
  );

  useEffect(() => {
    if (isLoading) {
      const id = setInterval(() => {
        setIsLoading(false);
        setIsShowPopup(true);
      }, 1500);
      setIntervalID(id);

      return () => {
        clearInterval(id);
      };
    }
  }, [isLoading]);

  useEffect(() => {
    if (isShowPopup) {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    }
  }, [isShowPopup]);

  useEffect(() => {
    const animations = animatedColors.map((animatedColor) =>
      Animated.timing(animatedColor, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      })
    );

    const reverseAnimations = animatedColors.map((animatedColor) =>
      Animated.timing(animatedColor, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      })
    );

    const loopAnimation = () => {
      Animated.stagger(50, [...animations, ...reverseAnimations]).start(
        loopAnimation
      );
    };

    loopAnimation();

    return () => {
      animations.forEach((animation) => animation.stop());
      reverseAnimations.forEach((animation) => animation.stop());
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const maxX = WINDOW_WIDTH * 0.9 - 45;
        if (gestureState.dx >= 0 && gestureState.dx <= maxX) {
          Animated.event([null, { dx: pan.x }], {
            useNativeDriver: false,
          })(e, gestureState);

          setIsLoading(gestureState.dx > WIDTH_LIMIT);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > WIDTH_LIMIT / 2) {
          setIsLoading(true);
          Animated.spring(pan, {
            toValue: { x: WIDTH_LIMIT, y: 0 },
            useNativeDriver: false,
          }).start();
        } else {
          setIsLoading(false);
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View {...panResponder.panHandlers} style={[pan.getLayout()]}>
        <View style={styles.button}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#737373" />
          ) : (
            <Image
              source={icon.hand}
              style={{
                width: 27,
                height: 27,
                resizeMode: "cover",
              }}
            />
          )}
        </View>
      </Animated.View>
      <View style={styles.slideContent}>
        <Text style={styles.slideTextContent}>
          {COMPLETED_TEXT.split("").map((char, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.charText,
                {
                  color: animatedColors[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#FFFFFF", "#000000"],
                  }),
                },
              ]}>
              {char}
            </Animated.Text>
          ))}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: WINDOW_HEIGHT * 0.1,
    width: "100%",
    height: 50,
    backgroundColor: "#2865E7",
    borderRadius: 25,
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  slideContent: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
  },
  slideTextContent: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  charText: {
    fontSize: 18,
  },
});

export default SlidingButton;
