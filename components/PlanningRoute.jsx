import {
  Menu,
  Box,
  Heading,
  Text,
  HStack,
  Pressable,
  VStack,
  Divider,
  Button,
  Select,
} from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { GlobalContext } from "../contexts/global";
import dayjs from "dayjs";
import * as SecureStore from "expo-secure-store";
import { usePlannedRouteApi } from "../api/PlannedRouteApi";
import { useNavigation } from "@react-navigation/native";

const PlanningRoute = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const keyShowSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setKeyboardStatus(true);
    });
    const keyHideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardStatus(false);
    });
    return () => {
      keyHideSubscription.remove();
      keyShowSubscription.remove();
    };
  }, []);

  const handleBackToDestination = () => {
    dispatch({
      type: "MODIFY_STAGE",
      payload: {
        level: "CHOOSING_DESTINATION",
        display: "search",
        locationSearch: {
          text: "Where to?",
        },
      },
    });
  };

  const handleSelectStartWithSearch = () => {
    dispatch({
      type: "MODIFY_STAGE",
      payload: {
        level: "CHOOSING_START",
        display: "search",
        locationSearch: {
          text: "Select a start point",
        },
      },
    });
  };

  /**
   *
   * Datepicker
   */
  const showDateTimePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDateTimePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDateTimeSelect = (date) => {
    setDate(date);
    hideDateTimePicker();
  };
  const isPlanDisabled = () => {
    return !(state.start.item && state.dest.item && date);
  };

  /*
   *
   * Planning
   * */
  const handlePlan = async () => {
    const carPlate = state.driver.driver.carPlate;

    let plannedRouteDTO = {
      id: "",
      plannedFrom: state.start.item.structured_formatting.main_text,
      plannedTo: state.dest.item.structured_formatting.main_text,
      dateTime: date,
      capacity: 4,
      originLatitude: state.start.geo.lat,
      originLongitude: state.start.geo.lng,
      destLatitude: state.dest.geo.lat,
      destLongitude: state.dest.geo.lng,
    };

    const { createPlannedRoute } = usePlannedRouteApi(state.token);
    let plannedRoute = await createPlannedRoute(plannedRouteDTO, carPlate);
    if (plannedRoute) {
      console.log(plannedRoute);
      navigation.navigate("ScheduledRides");
    }
    if (!plannedRoute) console.log("failed?!");
  };

  return (
    <Box style={{ ...styles.box, marginTop: keyboardStatus ? 0 : "auto" }}>
      <VStack>
        <Text bold fontSize="lg">
          Select your start location:
        </Text>
        <Pressable onPress={handleSelectStartWithSearch}>
          {({ isPressed }) => {
            return (
              <HStack style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}>
                <Text fontSize="md" bold style={styles.text}>
                  From:{" "}
                </Text>
                {state.start.item ? (
                  <Text
                    fontSize="md"
                    isTruncated
                    maxWidth="250"
                    style={styles.text}
                  >
                    {state.start.item.structured_formatting.main_text}
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </HStack>
            );
          }}
        </Pressable>
        <Divider />
        <Pressable onPress={handleBackToDestination}>
          {({ isPressed }) => {
            return (
              <HStack style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}>
                <Text fontSize="md" bold style={styles.text}>
                  To:{" "}
                </Text>
                <Text
                  fontSize="md"
                  isTruncated
                  maxWidth="300"
                  style={styles.text}
                >
                  {state.dest.item.structured_formatting.main_text}
                </Text>
              </HStack>
            );
          }}
        </Pressable>

        <HStack>
          <Button
            onPress={showDateTimePicker}
            style={{
              paddingLeft: 0,
            }}
          >
            {dayjs(date).format("DD/MM h:mma")}
          </Button>
        </HStack>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleDateTimeSelect}
          onCancel={hideDateTimePicker}
        />
        <Button
          style={{
            marginTop: 10,
          }}
          _text={{
            fontSize: "md",
          }}
          variant="outline"
          isDisabled={isPlanDisabled()}
          onPress={handlePlan}
        >
          Plan
        </Button>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "90%",
    padding: 15,
    marginBottom: 90,
    borderRadius: 10,
  },
  text: {
    paddingTop: 3,
    paddingBottom: 3,
  },
});
export default PlanningRoute;

