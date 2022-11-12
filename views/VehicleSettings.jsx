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
  const [rendered, setRendered] = useState(false);

  const [fieldCarPlateColor, setFieldCarPlateColor] = useState("white");
  const [fieldModelAndColourColor, setFieldModelAndColourColor] = useState("white");
  const [fieldCapacityColor, setFieldCapacityColor] = useState("white");
  const [fieldFuelTypeColor, setFieldFuelTypeColor] = useState("white");

  const [buttonMessage, setButtonMessage] = useState("Save changes");

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
    { label: "92", value: "92" },
    { label: "95", value: "95" },
    { label: "98", value: "98" },
    { label: "Premium", value: "Premium" },
    { label: "Diesel", value: "Diesel" },
  ]);

  const renderDefaults = async () => {
    let token = await SecureStore.getItemAsync("idToken");
    let cp = await SecureStore.getItemAsync("carPlate");

    let driver = await useDriverApi(token).getDriverByCarPlate(cp);

    setCarPlate(driver.carPlate);
    setModelAndColour(driver.modelAndColour);
    setCapacity(driver.capacity);
    setFuelType(driver.fuelType);

    setRendered(true);
  }

  if(!rendered){
    renderDefaults();
  }

  const submit = async function () {
    setCarPlate(carPlate.toUpperCase());
    const carPlateIsValid = carPlate.length >= 4 && carPlate.length <= 8;
    const modelAndColourIsvalid = modelAndColour.length > 4 && modelAndColour.length < 255;
    const capacityIsValid = capacity >= 2 && capacity <= 12;
    const fuelTypeIsValid = fuelType === '92' || fuelType === '95' || fuelType === '98' || fuelType === 'Premium' || fuelType === 'Diesel';

    if (!carPlateIsValid) {
      setFieldCarPlateColor("red.500");
    }
    else {
      setFieldCarPlateColor("white");
    }
    if (!modelAndColourIsvalid) {
      setFieldModelAndColourColor("red.500");
    }
    else {
      setFieldModelAndColourColor("white");
    }
    if (!capacityIsValid) {
      setFieldCapacityColor("red");
    }
    else {
      setFieldCapacityColor("white");
    }
    if (!fuelTypeIsValid) {
      setFieldFuelTypeColor("red");
    }
    else {
      setFieldFuelTypeColor("white");
    }
    if (carPlateIsValid && modelAndColourIsvalid && capacityIsValid && fuelTypeIsValid) {
      let driverDTO = {
        carPlate: carPlate,
        modelAndColour: modelAndColour,
        capacity: capacity,
        fuelType: fuelType,
      };
      let driver = await useDriverApi(await SecureStore.getItemAsync("idToken")).updateDriver(carPlate, driverDTO);
      if (driver) {
        setButtonMessage("Success!");
      }
    }
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
            <Text style={{ fontSize: 16 }}>{carPlate}</Text>
            <FormControl.Label style={{ alignItems: "center" }}>
              Model and Colour
            </FormControl.Label>
            <Input
              type="Text"
              defaultValue={modelAndColour}
              onChangeText={setModelAndColour}
              variant="underlined"
              size="lg"
              borderColor={fieldModelAndColourColor}
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
                borderColor: fieldCapacityColor,
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
                borderColor: fieldFuelTypeColor,
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
              {buttonMessage}
            </Button>
          </Center>
        </Stack>
      </Box>
    </View>
  );
};

export default VehicleSettings;
