import { Dimensions } from "react-native";

type Params = {
  address: string;
  apiKey: string;
};

async function getCoordinatesFromAddress(address, apiKey): Params {
  try {
    const encodedAddress = encodeURIComponent(address);
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;
      return { latitude, longitude };
    } else {
      console.log("Geocoding failed: ", data);
      return null;
    }
  } catch (error) {
    console.log("Error geocoding address: ", error);
    return null;
  }
}
export { getCoordinatesFromAddress };

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get("window");
