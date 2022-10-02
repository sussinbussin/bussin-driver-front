import { View } from "native-base";
import HomeTopBar from "../components/HomeTopBar";
const Home = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HomeTopBar />
    </View>
  );
};

export default Home;
