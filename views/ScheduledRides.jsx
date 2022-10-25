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
import { useContext, useState, useEffect } from "react";
import TopBarBack from "../components/TopBarBack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalContext } from "../contexts/global";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SecureStore from "expo-secure-store";
import { useDriverApi } from "../api/DriverApi";
import dayjs from "dayjs";
import arraySupport from "dayjs/plugin/arraySupport";

function compare( a, b ) {
  if ( a.date == b.date ){
    if ( a.time < b.time ){
      return 1;
    } else {
      return -1;
    }
  } else if (a.date < b.date) {
    return 1;
  } else {
    return -1;
  }
}

const getPlannedRoutes = async (setData) => {
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

  let today = dayjs();
  dayjs.extend(arraySupport)

  let driver = await useDriverApi(idToken, carPlate).getDriverByCarPlate(carPlate);
  const plannedRoutes = driver.plannedRoutes;
  let routes = [];
  for (let i = 0; i < plannedRoutes.length; i++) {
    plannedRoutes[i].dateTime[1] -= 1;
    let date = dayjs(plannedRoutes[i].dateTime.slice(0, 5))
    console.log("Routes")
    console.log(plannedRoutes[i])
    let status = ""
    if (plannedRoutes[i].rides.length == 0) {
      if (date < today) {
        status = "Expired";
      } else {
        status = "Available"
      }
    } else {
      if (date < today) {
        status = "Done";
      } else {
        status = "Booked"
      }
    }
    console.log()
    routes.push({
      id: plannedRoutes[i].id,
      to: plannedRoutes[i].plannedTo,
      from: plannedRoutes[i].plannedFrom,
      cost: "",
      date: date.format('DD/MM/YYYY'),
      time: date.format('hh:mmA'),
      noPassengers: plannedRoutes[i].capacity,
      status: status,
    });
  }
  setData(routes.sort(compare));
}

const ScheduledRides = () => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.scheduledRides) return null;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // for dynamic rendering or smth idk
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    getPlannedRoutes(setData);
  }, []);

  const renderItem = ({ item }) => (
    <List style={{ paddingTop: 20, paddingBottom: 20 }}>
      <View style={{ marginLeft: 15 }}>
        <View flexDirection="row" style={{ marginBottom: 5 }}>
          
        </View>
        <View flexDirection="row" style={{ marginBottom: 5 }}>
          <Text fontSize="md" style={{ marginRight: 5}}>
            From:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {item.from}
          </Text>
        </View>
        <View flexDirection="row" style={{ marginBottom: 5 }}>
          <Text fontSize="md" style={{ marginRight: 23}}>
            To:
          </Text>
          {/* <AntDesign
            name="arrowright"
            size={20}
            color="white"
            style={{ marginLeft: 5, marginRight: 5, marginTop: 2.5 }}
          /> */}
          <Text fontSize="md" fontWeight="bold">
            {item.to}
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
        data={data}
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
