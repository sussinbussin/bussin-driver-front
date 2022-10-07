import { GOOGLE_API_KEY } from "@env";
import { View } from "native-base";
import HomeTopBar from "../components/HomeTopBar";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "../theming/mapStyle";
import { StyleSheet } from "react-native";
import { GlobalContext } from "../contexts/global";
import * as Location from "expo-location";
import { useContext, useRef, useState, useEffect } from "react";

const Home = ({ navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [location, setLocation] = useState();
  const map = useRef();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5,
      });
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {location && (
        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          ref={map}
          showsUserLocation={true}
          initialCamera={{
            center: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            pitch: 0,
            heading: 0,
            zoom: 15,
            altitude: location.altitude,
          }}
        ></MapView>
      )}
      <HomeTopBar />
    </View>
  );
};

export default Home;
