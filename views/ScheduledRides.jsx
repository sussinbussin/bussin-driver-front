import {
  Text,
  Box,
  Button,
  Heading,
  FormControl,
  Input,
  Stack,
  Center,
  View,
  Pressable,
  Flex,
  List,
  FlatList,
} from "native-base";
import { useContext, useState } from "react";
import TopBarBack from "../components/TopBarBack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalContext } from "../contexts/global";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SecureStore from "expo-secure-store";
import { useDriverApi } from "../api/DriverApi";

// hardcoded data
// TODO: get data from api
const DATA = [
  {
    id: "1",
    to: "City Hall",
    from: "Kallang",
    cost: "$5.00",
    date: "Mon, 3 Oct 2022",
    time: "7:00AM to 7:15AM",
    noPassengers: "1",
    status: "Past",
  },
  {
    id: "2",
    to: "SMU",
    from: "Changi",
    cost: "$19.99",
    date: "Mon, 17 Oct 2022",
    time: "7:00AM to 7:15AM",
    noPassengers: "1",
    status: "Upcoming",
  },
  {
    id: "3",
    to: "Changi",
    from: "Woodlands",
    cost: "$25.69",
    date: "Mon, 10 Oct 2022",
    time: "7:00PM to 7:15PM",
    noPassengers: "2",
    status: "Current",
  },

  {
    id: "4",
    to: "Changi",
    from: "Woodlands",
    cost: "$25.69",
    date: "Mon, 10 Oct 2022",
    time: "7:00PM to 7:15PM",
    noPassengers: "2",
    status: "Current",
  },

  {
    id: "5",
    to: "SMU",
    from: "Changi",
    cost: "$19.99",
    date: "Mon, 17 Oct 2022",
    time: "7:00AM to 7:15AM",
    noPassengers: "1",
    status: "Upcoming",
  },

  {
    id: "6",
    to: "Heaven",
    from: "Kallang",
    cost: "$19.99",
    date: "Mon, 17 Oct 2022",
    time: "7:00AM to 7:15AM",
    noPassengers: "1",
    status: "Upcoming",
  },
];

const getPlannedRoutes = async () => {
  const handleGetToken = async (key) => {
    const tokenFromPersistentState = await SecureStore.getItemAsync(
      key, 
    );
    if (tokenFromPersistentState) {
      return tokenFromPersistentState;
    }
  };

  const idToken = await handleGetToken("idToken", );
  const carPlate = await handleGetToken("carPlate", );

  let driver = await useDriverApi(idToken, carPlate).getDriverByCarPlate(carPlate);
  console.log("Planned Routes: " + driver.plannedRoutes);
  // DATA = getDriverByCarPlate(carPlate)
}

const ScheduledRides = () => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.scheduledRides) return null;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // for dynamic rendering or smth idk
  const [selectedId, setSelectedId] = useState(null);

  getPlannedRoutes();

  const renderItem = ({ item }) => (
    <List style={{ paddingTop: 20, paddingBottom: 20 }}>
      <View style={{ marginLeft: 15 }}>
        <View flexDirection="row" style={{ marginBottom: 5 }}>
          <Text fontSize="md" fontWeight="bold">
            {item.from}
          </Text>
          <AntDesign
            name="arrowright"
            size={20}
            color="white"
            style={{ marginLeft: 5, marginRight: 5, marginTop: 2.5 }}
          />
          <Text fontSize="md" fontWeight="bold">
            {item.to}
          </Text>

          <Text
            fontSize="md"
            fontWeight="semibold"
            textAlign="right"
            flex="1"
            marginRight="5"
          >
            {item.status}
          </Text>
        </View>

        <View flexDirection="row" style={{ marginBottom: 18 }}>
          <AntDesign
            name="wallet"
            size={20}
            color="white"
            style={{ marginRight: 7, marginTop: 2.75 }}
          />
          <Text fontSize="md" fontWeight="bold">
            {item.cost}
          </Text>
        </View>

        <View flexDirection="row" style={{ marginBottom: 5 }}>
          <AntDesign
            name="calendar"
            size={20}
            color="white"
            style={{ marginRight: 7 }}
          />
          <Text>{item.date}</Text>
        </View>

        <View flexDirection="row" style={{ marginBottom: 5 }}>
          <AntDesign
            name="clockcircleo"
            size={20}
            color="white"
            style={{ marginRight: 7 }}
          />
          <Text>{item.time}</Text>
        </View>

        <View flexDirection="row">
          <AntDesign
            name="user"
            size={20}
            color="white"
            style={{ marginRight: 7 }}
          />
          <Text>{item.noPassengers} Passenger</Text>
        </View>

        <Text>{item.name}</Text>
      </View>
    </List>
  );

  return (
    <View>
      <TopBarBack></TopBarBack>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          paddingBottom: 10,
          marginLeft: 17,
        }}
      >
        My Rides
      </Text>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{
          marginLeft: 15,
          marginRight: 15,
          paddingBottom: 30,
          height: "80%",
        }}
        extraData
      />
      {/* padding thing idk how change */}
      <Box style={{ height: 100 }}></Box>
    </View>
  );
};

export default ScheduledRides;
