import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  StatusBar,
} from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { JobProps } from "../../utils/helper";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utils";
import { icon } from "../../assets";

const BookCarScreen = () => {
  const navigation = useNavigation();

  const handleNavigateDetail = () => {
    setTimeout(() => {
      navigation.navigate("Job", { screen: "MapWithRouteScreen" });
    }, 300);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#575757"]}
        start={[0, 0]}
        end={[0, 1]}
        style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.headerText}>Jobs</Text>

          <View style={styles.jobProps}>
            {JobProps?.map((item) => (
              <Pressable
                style={[
                  styles.jobButton,
                  { backgroundColor: item?.status ? "#000000" : "#EDEDED" },
                ]}
                key={item?.id}>
                <Text
                  style={{
                    color: item?.status ? "#FFFFFF" : "#ABABAB",
                    fontSize: 16,
                    fontWeight: "500",
                  }}>
                  {item?.title}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable onPress={handleNavigateDetail} style={styles.infoCard}>
            <View style={styles.infoCardContent}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoHeaderText}>Expo Hall 7</Text>
                <Text style={styles.infoHeaderText}>$65.00</Text>
              </View>

              <View style={styles.infoTime}>
                <Image source={icon.clock} style={styles.infoTimeIcon} />
                <Text style={styles.infoTimeText}>in 7 hours</Text>
              </View>

              <View style={styles.infoDetails}>
                <View style={styles.infoDetailsIcon}>
                  <Image
                    source={icon.travel}
                    style={styles.infoDetailsTravelIcon}
                  />
                  <View style={styles.infoDetailsVerticalLine} />
                  <View style={styles.infoDetailsCircle} />
                </View>

                <View style={styles.infoDetailsText}>
                  <View style={styles.infoDetailsLocation}>
                    <Text style={styles.infoDetailsLocationText}>
                      Far East Plaza
                    </Text>
                    <Text style={styles.infoDetailsLocationSubText}>
                      Expo Hall 7, Singapore
                    </Text>
                  </View>

                  <View style={styles.infoDetailsAddress}>
                    <Text style={styles.infoDetailsAddressText}>
                      Far East Plaza
                    </Text>
                    <Text style={styles.infoDetailsAddressSubText}>
                      14 Scotts Road, Orchard, Singapore, Singapore 228213
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.lightningContainer}>
          <Image source={icon.lightning} style={styles.lightning} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default BookCarScreen;

BookCarScreen.navigationOptions = {
  tabBarVisible: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  gradient: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
  },
  jobProps: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  jobButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoCard: {
    backgroundColor: "#000000",
    borderRadius: 7,
    marginTop: 20,
  },
  infoCardContent: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  infoHeader: {
    paddingBottom: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoHeaderText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
  },
  infoTime: {
    position: "absolute",
    right: 15,
    top: WINDOW_WIDTH * 0.12,
    flexDirection: "row",
    alignItems: "center",
  },
  infoTimeIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  infoTimeText: {
    color: "#737C8C",
  },
  infoDetails: {
    paddingHorizontal: 18,
    flexDirection: "row",
  },
  infoDetailsIcon: {
    flexDirection: "column",
  },
  infoDetailsTravelIcon: {
    width: 15,
    height: 20,
    resizeMode: "cover",
  },
  infoDetailsVerticalLine: {
    marginVertical: 10,
    marginHorizontal: 6,
    width: 2,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#1168E9",
  },
  infoDetailsCircle: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: "#1168E9",
  },
  infoDetailsText: {
    paddingHorizontal: 20,
  },
  infoDetailsLocation: {
    width: WINDOW_WIDTH * 0.75,
    marginTop: -WINDOW_HEIGHT * 0.004,
  },
  infoDetailsLocationText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  infoDetailsLocationSubText: {
    fontSize: 16,
    color: "#737C8C",
    fontWeight: "400",
    paddingVertical: 3,
  },
  infoDetailsAddress: {
    marginTop: WINDOW_HEIGHT * 0.04,
    flexDirection: "row",
    width: WINDOW_WIDTH * 0.75,
    flexWrap: "wrap",
  },
  infoDetailsAddressText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  infoDetailsAddressSubText: {
    lineHeight: 25,
    fontSize: 16,
    color: "#737C8C",
    fontWeight: "400",
    paddingVertical: 3,
  },
  lightningContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 15,
  },
  lightning: {
    width: 25,
    height: 30,
    resizeMode: "cover",
  },
});
