import React from "react";
import { View } from "react-native";
import MapWithRouteScreen from "./screen/common/MapWithRouteScreen";
import RootScreen from "./screen/RootScreen";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <RootScreen />
    </View>
  );
};

export default App;
