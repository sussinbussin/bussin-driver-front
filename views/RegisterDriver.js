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
import { useCreateDriverAPI } from "../api/DriverCreateAPI";
import TopBarBack from "../components/TopBarBack";

const RegisterDriver = ({ navigation, route }) => {
  const { state } = useContext(GlobalContext);

  if (!state.flags.registerName) return null;

  const [carPlate, setCarPlate] = useState("");
  const [modelAndColour, setModelAndColour] = useState("");
  const [capacity, setCapacity] = useState("");
  const [fuelType, setFuelType] = useState("");

  const [fieldCarPlateColor, setFieldCarPlateColor] = useState("white");
  const [fieldModelAndColourColor, setFieldModelAndColourColor] = useState("white");
  const [fieldCapacityColor, setFieldCapacityColor] = useState("white");
  const [fieldFuelTypeColor, setFieldFuelTypeColor] = useState("white");

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

  const makeDriver = async function () {
    setCarPlate(carPlate.toUpperCase());
    const carPlateIsValid = carPlate.length >= 4 && carPlate.length <= 8;
    const modelAndColourIsvalid = modelAndColour.length > 4 && modelAndColour.length < 255;
    const capacityIsValid = capacity >= 2 && capacity <= 12;
    const fuelTypeIsValid = fuelType === 'Type92' || fuelType === 'Type95' || fuelType === 'Type98' || fuelType === 'TypePremium' || fuelType === 'TypeDiesel';

    if(!carPlateIsValid){
      setFieldCarPlateColor("red.500");
    }
    else{
      setFieldCarPlateColor("white");
    }
    if(!modelAndColourIsvalid){
      setFieldModelAndColourColor("red.500");
    }
    else{
      setFieldModelAndColourColor("white");
    }
    if(!capacityIsValid){
      setFieldCapacityColor("red");
    }
    else{
      setFieldCapacityColor("white");
    }
    if(!fuelTypeIsValid){
      setFieldFuelTypeColor("red");
    }
    else{
      setFieldFuelTypeColor("white");
    }

    if(carPlateIsValid && modelAndColourIsvalid && capacityIsValid && fuelTypeIsValid) {
      let driverDTO = {
        carPlate: carPlate,
        modelAndColour: modelAndColour,
        capacity: capacity,
        fuelType: fuelType,
      };
  
      let driver = await useCreateDriverAPI(await SecureStore.getItemAsync("idToken"), await SecureStore.getItemAsync("uuid"), driverDTO).createDriver();
      if (driver) {
        await SecureStore.setItemAsync(
          "carPlate",
          JSON.stringify(carPlate).replace(/['"]+/g, '')
        );
        navigation.navigate("Home");
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBarBack/>

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
              borderColor={fieldCarPlateColor}
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
              borderColor={fieldModelAndColourColor}
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
              zIndex={2000}
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
              zIndex={3000}
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
