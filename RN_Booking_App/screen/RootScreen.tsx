import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MapWithRouteScreen from "./common/MapWithRouteScreen";
import { icon } from "../assets";
import { Image } from "react-native";
import BookCarScreen from "./bottomTab/BookCarScreen";

const Tab = createBottomTabNavigator();
const JobStack = createStackNavigator();
const tabBarHeight = 60;
const screenOptions = {
  headerShown: false,
};

const JobStackScreen = () => (
  <JobStack.Navigator>
    <JobStack.Screen
      name="BookCarScreen"
      component={BookCarScreen}
      options={screenOptions}
    />
    <JobStack.Screen
      name="MapWithRouteScreen"
      component={MapWithRouteScreen}
      options={screenOptions}
    />
  </JobStack.Navigator>
);

const CustomTabBarIcon = ({ focused, icon }: any) => (
  <Image
    source={icon}
    style={{
      width: 25,
      height: 25,
      resizeMode: "stretch",
      tintColor: focused ? "#007AFF" : "#888888",
    }}
  />
);

export default function RootScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Job"
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: tabBarHeight,
            display:
              route.params?.screen === "MapWithRouteScreen" ? "none" : "flex",
          },
          tabBarIcon: ({ focused }) => {
            let ic;
            if (route.name === "Home") {
              ic = icon.home;
            } else if (route.name === "Coin") {
              ic = icon.coin;
            } else if (route.name === "Job") {
              ic = icon.car;
            } else {
              ic = icon.menu;
            }
            return <CustomTabBarIcon focused={focused} icon={ic} />;
          },
          tabBarLabelStyle: {
            fontSize: 14,
            marginBottom: 3,
          },
        })}>
        <Tab.Screen
          name="Home"
          component={BookCarScreen}
          options={screenOptions}
        />
        <Tab.Screen
          name="Coin"
          component={BookCarScreen}
          options={screenOptions}
        />
        <Tab.Screen
          name="Job"
          component={JobStackScreen}
          options={screenOptions}
        />
        <Tab.Screen
          name="Menu"
          component={BookCarScreen}
          options={screenOptions}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
