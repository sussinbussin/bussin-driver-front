import { Text, Box, Button, View, List, FlatList } from "native-base";
import { useContext, useState, useEffect } from "react";
import TopBarBack from "../components/TopBarBack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalContext } from "../contexts/global";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDriverApi } from "../api/DriverApi";
import dayjs from "dayjs";
import arraySupport from "dayjs/plugin/arraySupport";
import { useTrackApi } from "../api/TrackApi";

function compare(a, b) {
  return new Date(b.date) - new Date(a.date);
}

const getPlannedRoutes = async (setData, state) => {
  const idToken = state.token;
  const carPlate = state.driver.driver.carPlate;

  let today = dayjs();
  dayjs.extend(arraySupport);

  const { getDriverByCarPlate } = useDriverApi(idToken);
  let driver = await getDriverByCarPlate(carPlate);

  if (!driver) {
    return;
  }

  const plannedRoutes = driver.plannedRoutes;
  let routes = [];
  for (let i = 0; i < plannedRoutes.length; i++) {
    plannedRoutes[i].dateTime[1] -= 1;
    plannedRoutes[i].dateTime[3] += 8;
    let date = dayjs(plannedRoutes[i].dateTime.slice(0, 5));
    let status = "";

    // check status for each ride
    if (plannedRoutes[i].rides.length == 0) {
      if (date < today) {
        status = "Expired";
      } else {
        status = "Available";
      }
    } else {
      if (date < today) {
        status = "Done";
      } else {
        status = "Booked";
      }
    }
    routes.push({
      id: plannedRoutes[i].id,
      to: plannedRoutes[i].plannedTo,
      from: plannedRoutes[i].plannedFrom,
      cost: "",
      date: date,
      noPassengers: plannedRoutes[i].capacity,
      status: status,
    });
  }
  setData(routes.sort(compare));
};

const ScheduledRides = () => {
  const { state, dispatch } = useContext(GlobalContext);
  if (!state.flags.scheduledRides) return null;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // for dynamic rendering
  const [data, setData] = useState([]);

  useEffect(() => {
    getPlannedRoutes(setData, state);
  }, []);

  const handleStartRide = async (item) => {
    const { createTrack } = useTrackApi();
    console.log(item);
    const result = await createTrack({ uuid: item.id, status: "started" });
    if (!result) {
      console.log("createTrack error");
      //handle rerror;
      return;
    }
    dispatch({
      type: "SET_TRACK",
      payload: result.id,
    });
    dispatch({
      type: "MODIFY_STAGE",
      payload: {
        ...state.stage,
        display: "drive",
      },
    });

    navigation.navigate("Home");
  };

  const renderItem = ({ item }) => (
    <List
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        borderWidth: 0,
        borderColor: "muted.300",
      }}
    >
      <View style={{ marginLeft: 15 }}>
        <View flexDirection="row" style={{ marginBottom: 5 }}></View>
        <View flexDirection="row" style={{ marginBottom: 5 }}>
          <Text fontSize="md" style={{ marginRight: 5 }}>
            From:
          </Text>
          <Text fontSize="md" fontWeight="bold" isTruncated maxWidth={280}>
            {item.from}
          </Text>
        </View>
        <View flexDirection="row" style={{ marginBottom: 5 }}>
          <Text fontSize="md" style={{ marginRight: 23 }}>
            To:
          </Text>
          <Text fontSize="md" fontWeight="bold" isTruncated maxWidth={280}>
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
          <Text>{item.date.format("DD/MM/YYYY")}</Text>
        </View>

        <View flexDirection="row" style={{ marginBottom: 5 }}>
          <AntDesign
            name="clockcircleo"
            size={20}
            color="white"
            style={{ marginRight: 7 }}
          />
          <Text>{item.date.format("hh:mmA")}</Text>
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
        {item.status == "Booked" && (
          <Button variant="outline" onPress={() => handleStartRide(item)}>
            Start Ride
          </Button>
        )}
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
      <Box style={{ height: 100 }}></Box>
    </View>
  );
};

export default ScheduledRides;
