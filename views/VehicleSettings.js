import {
  Alert,
  Text,
  Box,
  Button,
  Heading,
  FormControl,
  Input,
  Stack,
  Center,
  View,
} from "native-base";
import TopBarBack from "../components/TopBarBack";
import { useContext, useState } from "react";
import { useDriverApi } from "../api/DriverApi";
import { GlobalContext } from "../contexts/global";
import DropdownPicker from "react-native-dropdown-picker";
import * as SecureStore from "expo-secure-store";

const VehicleSettings = () => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.register) return null;

  const [carPlate, setCarPlate] = useState("");
  const [modelAndColour, setModelAndColour] = useState("");
  const [capacity, setCapacity] = useState("");
  const [fuelType, setFuelType] = useState("");

  const [capacityOpen, setCapacityOpen] = useState(false);
  const [capacityItems, setCapacityItems] = useState([
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "11", value: 11 },
    { label: "12", value: 12 },
  ]);

  const [fuelTypeOpen, setFuelTypeOpen] = useState(false);
  const [fuelTypeItems, setFuelTypeItems] = useState([
    { label: "92", value: "Type92" },
    { label: "95", value: "Type95" },
    { label: "98", value: "Type98" },
    { label: "Premium", value: "TypePremium" },
    { label: "Diesel", value: "TypeDiesel" },
  ]);

  const renderDefaults = async () => {
    let token = await SecureStore.getItemAsync("idToken");
    let cp = await SecureStore.getItemAsync("carPlate");
  
    let driver = await useDriverApi(token).getDriverByCarPlate(cp);

    setCarPlate(driver.carPlate);
    setModelAndColour(driver.modelAndColour);
    setCapacity(driver.capacity);
    setFuelType(driver.fuelType);
  }
  renderDefaults();

  const submit = () => {

  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBarBack></TopBarBack>
      <Text style={{ paddingTop: 30, fontSize: 20, fontWeight: "bold" }}>Edit Vehicle Information</Text>
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
          <Center>
            <FormControl.Label style={{ alignItems: "center" }}>
              Car Plate Number
            </FormControl.Label>
            <Input
              type="Text"
              defaultValue={carPlate}
              onChangeText={setCarPlate}
              variant="underlined"
              size="lg"
            />
            <FormControl.Label style={{ alignItems: "center" }}>
              Model and Colour
            </FormControl.Label>
            <Input
              type="Text"
              defaultValue={modelAndColour}
              onChangeText={setModelAndColour}
              variant="underlined"
              size="lg"
            />
            <FormControl.Label style={{ marginTop: 15 }}>
              Capacity
            </FormControl.Label>
            <DropdownPicker
              defaultValue={capacity}
              open={capacityOpen}
              value={capacity}
              items={capacityItems}
              setOpen={setCapacityOpen}
              setValue={setCapacity}
              setItems={setCapacityItems}
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
              defaultValue={fuelType}
              open={fuelTypeOpen}
              value={fuelType}
              items={fuelTypeItems}
              setOpen={setFuelTypeOpen}
              setValue={setFuelType}
              setItems={setFuelTypeItems}
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
              onPress={() => {
                submit();
              }}
              w="100%"
              style={{ marginTop: 25 }}
              variant="outline"
            >
              Save Changes
            </Button>
          </Center>
        </Stack>
      </Box>
    </View>
  );
};

export default VehicleSettings;
