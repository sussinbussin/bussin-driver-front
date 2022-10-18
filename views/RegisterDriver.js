import {
  Heading,
  View,
  Box,
  HStack,
  Center,
  Stack,
  FormControl,
  Button,
  Text,
  Input,
} from "native-base";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/global";
import * as SecureStore from "expo-secure-store";
import TopBar from "../components/TopBar";
import DropdownPicker from "react-native-dropdown-picker";
import { useUserApi } from "../api/UsersApi";
import { useCreateDriverAPI } from "../api/DriverCreateAPI";

const RegisterDriver = ({ navigation, route }) => {
  const { state } = useContext(GlobalContext);

  if (!state.flags.registerName) return null;

  const [carPlate, setCarPlate] = useState("");
  const [modelAndColour, setModelAndColour] = useState("");
  const [capacity, setCapacity] = useState("");
  const [fuelType, setFuelType] = useState("");

  const [capacityOpen, setCapacityOpen] = useState(false);
  const [capacityItems, setCapacityItems] = useState([
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
  ]);

  const [fuelTypeOpen, setFuelTypeOpen] = useState(false);
  const [fuelTypeItems, setFuelTypeItems] = useState([
    { label: "92", value: "Type92" },
    { label: "95", value: "Type95" },
    { label: "98", value: "Type98" },
    { label: "Premium", value: "TypePremium" },
    { label: "Diesel", value: "TypeDiesel" },
  ]);

  const makeDriver = async function () {
    let driverDTO = {
      carPlate: carPlate,
      modelAndColour: modelAndColour,
      capacity: capacity,
      fuelType: fuelType,
    };

    let driver = await useCreateDriverAPI(await SecureStore.getItemAsync("idToken"), await SecureStore.getItemAsync("uuid"), driverDTO).createDriver();
    if (driver) {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBar></TopBar>

      <Box
        w="100%"
        maxWidth="500px"
        style={{
          marginTop: 20,
          padding: 10,
        }}
        variant="light"
      >
        <Stack mx="10">
          <Center style={{ paddingTop: 30 }}>
            <FormControl.Label style={{ alignItems: "center" }}>
              Car plate number
            </FormControl.Label>
            <Input
              value={carPlate}
              placeholder={"Car Plate"}
              onChangeText={(text) => setCarPlate(text)}
              variant="underlined"
              size="lg"
            />
            <FormControl.Label style={{ marginTop: 15 }}>
              Car model and colour
            </FormControl.Label>
            <Input
              value={modelAndColour}
              placeholder={"Model and colour"}
              onChangeText={(text) => setModelAndColour(text)}
              variant="underlined"
              size="lg"
            />
            <FormControl.Label style={{ marginTop: 15 }}>
              Capacity
            </FormControl.Label>
            <DropdownPicker
              open={capacityOpen}
              value={capacity}
              items={capacityItems}
              setOpen={setCapacityOpen}
              setValue={setCapacity}
              setItems={setCapacityItems}
              placeholder={4}
              style={{
                backgroundColor: "black",
                borderColor: "white",
              }}
              placeholderStyle={{
                color: "grey",
              }}
              selectedItemContainerStyle={{
                backgroundColor: "grey",
              }}
              textStyle={{
                color: "white",
              }}
              dropDownContainerStyle={{
                backgroundColor: "#202020",
              }}
              zIndex={1000}
            />
            <FormControl.Label style={{ marginTop: 15 }}>
              Fuel Type
            </FormControl.Label>
            <DropdownPicker
              open={fuelTypeOpen}
              value={fuelType}
              items={fuelTypeItems}
              setOpen={setFuelTypeOpen}
              setValue={setFuelType}
              setItems={setFuelTypeItems}
              placeholder={"92"}
              style={{
                backgroundColor: "black",
                borderColor: "white",
              }}
              placeholderStyle={{
                color: "grey",
              }}
              selectedItemContainerStyle={{
                backgroundColor: "grey",
              }}
              textStyle={{
                color: "white",
              }}
              dropDownContainerStyle={{
                backgroundColor: "#202020",
              }}
              zIndex={500}
            />
            <Button
              onPress={makeDriver}
              w="100%"
              style={{ marginTop: 30 }}
              variant="outline"
            >
              Register
            </Button>
          </Center>
        </Stack>
      </Box>
    </View>
  );
};

export default RegisterDriver;
