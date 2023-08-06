import React, { useCallback, useRef } from "react";
import { StyleSheet, View, Pressable, Image, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";
import Modal from "../../components/Modal";
import { icon } from "../../assets";
import { apiKey } from "../../utils/helper";

const MapWithRouteScreen = () => {
  const navigation = useNavigation();
  const handleRootBack = useCallback(() => {
    navigation.navigate("Job", { screen: "BookCarScreen" });
  }, [navigation]);

  const mapRef = useRef(null);
  const origin = { latitude: 1.32796, longitude: 103.74442 };
  const destination = { latitude: 1.30718, longitude: 103.83381 };

  const renderMarkers = useCallback(() => {
    return (
      <>
        <Marker coordinate={origin} title="Starting Point" />
        <Marker
          coordinate={destination}
          icon={icon.car_ic_map}
          title="Destination Point"
        />
      </>
    );
  }, []);

  const fitToMarkers = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates([origin, destination], {
        edgePadding: {
          top: 100,
          right: 100,
          bottom: 200,
          left: 100,
        },
        animated: true,
      });
    }
  }, [origin, destination]);

  const initialRegion = {
    latitude: 1.32796,
    longitude: 103.74442,
    latitudeDelta: 0.05,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Pressable onPress={handleRootBack} style={styles.iconBackContainer}>
        <Image style={styles.iconBack} source={icon.back} />
      </Pressable>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        onMapReady={fitToMarkers}>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={apiKey}
          strokeWidth={5}
          strokeColor="#5791FD"
          mode={"TRANSIT"}
        />
        {renderMarkers()}
      </MapView>
      <View style={styles.buttonContainer}>
        <Pressable onPress={fitToMarkers} style={styles.iconTargetContainer}>
          <Image style={styles.iconTarget} source={icon.target} />
        </Pressable>
      </View>

      <Modal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    top: "50%",
    right: 15,
    marginTop: -22.5,
  },
  iconTargetContainer: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  iconTarget: {
    width: 25,
    height: 25,
  },
  iconBackContainer: {
    position: "absolute",
    top: 35,
    left: 15,
    zIndex: 9,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBack: {
    width: 10,
    height: 17,
    resizeMode: "cover",
  },
});

export default MapWithRouteScreen;
