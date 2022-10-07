import { GOOGLE_API_KEY } from "@env";
import { View } from "native-base";
import HomeTopBar from "../components/HomeTopBar";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "../theming/mapStyle";
import { StyleSheet } from "react-native";

const Home = ({ navigation }) => {
     return(<View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
       customMapStyle={mapStyle}
      ></MapView>
      <HomeTopBar />
    </View>
  );
};

export default Home;
