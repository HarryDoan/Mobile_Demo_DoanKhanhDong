import React, { useRef, useState, useMemo } from "react";
import {
  Animated,
  PanResponder,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import ModalContent from "./ModalContent";
import { WINDOW_HEIGHT } from "../utils";

type DirectionType = "up" | "center" | "bottom";
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.1;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_CENTER_WARD_TRANSLATE_Y = 0;
const MAX_BOTTOM_WARD_TRANSLATE_Y = 300;
const DRAG_THRESHOLD = 50;

const Test = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const [isChange, setChange] = useState(false);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (gesture.dy > 0) {
          if (gesture.dy > DRAG_THRESHOLD) {
            springAnimation("bottom");
          } else {
            springAnimation("center");
          }
        } else if (gesture.dy < -DRAG_THRESHOLD) {
          springAnimation("up");
        } else {
          springAnimation("center");
        }
      },
    })
  ).current;

  const springAnimation = (direction: DirectionType) => {
    if (direction === "up") {
      setChange(true);
    } else {
      setChange(false);
    }
    lastGestureDy.current =
      direction === "center"
        ? MAX_CENTER_WARD_TRANSLATE_Y
        : direction === "up"
        ? MAX_UPWARD_TRANSLATE_Y
        : MAX_BOTTOM_WARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = useMemo(
    () => ({
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [
              MAX_UPWARD_TRANSLATE_Y,
              MAX_CENTER_WARD_TRANSLATE_Y,
              MAX_BOTTOM_WARD_TRANSLATE_Y,
            ],
            outputRange: [
              MAX_UPWARD_TRANSLATE_Y,
              MAX_CENTER_WARD_TRANSLATE_Y,
              MAX_BOTTOM_WARD_TRANSLATE_Y,
            ],
            extrapolate: "clamp",
          }),
        },
      ],
    }),
    [animatedValue]
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <ModalContent isChange={isChange} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    top: WINDOW_HEIGHT / 2,
  },
  bottomSheet: {
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#a8bed2",
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  draggableArea: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default Test;
