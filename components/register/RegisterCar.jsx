import {
  Heading,
  View,
  Text,
  Stack,
  FormControl,
  Input,
  Button,
} from "native-base";
import { useContext, useState } from "react";
import { RegisterContext } from "../../contexts/register";
import TopBarBack from "../TopBarBack";
import DropdownPicker from "react-native-dropdown-picker";

const RegisterDetails = ({ navigation }) => {
  const state = useContext(RegisterContext);

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
    { label: "92", value: "92" },
    { label: "95", value: "95" },
    { label: "98", value: "98" },
    { label: "Premium", value: "Premium" },
    { label: "Diesel", value: "Diesel" },
  ]);

  const [displayCarPlateError, setDisplayCarPlateError] = useState(false);
  const [displayModelanColourError, setDisplayMobileAndColourError] =
    useState(false);
  const [displayCapacityError, setDisplayCapacityError] = useState(false);
  const [displayNricError, setDisplayFuelTypeError] = useState(false);

  const handleNext = async () => {
    const formData = {
      carPlate: carPlate,
      modelAndColour: modelAndColour,
      capacity: capacity,
      fuelType: fuelType,
    };
    state.driverDto = formData;

    navigation.navigate("RegisterComplete");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBarBack></TopBarBack>
      <Heading
        style={{
          alignSelf: "flex-start",
          paddingLeft: 30,
          paddingTop: 20,
        }}
        size="2xl"
      >
        Hello, {state.name}!
      </Heading>
      <Text
        style={{
          alignSelf: "flex-start",
          paddingLeft: 30,
        }}
      >
        We would like to hoard more details about your car!
      </Text>
      <Stack
        w="85%"
        style={{
          marginTop: 30,
        }}
      >
        <FormControl>
          <FormControl.Label style={{ alignItems: "center" }}>
            Car Plate Number
          </FormControl.Label>
          <Input
            value={carPlate}
            onChangeText={(event) => setCarPlate(event)}
            variant="underlined"
            size="lg"
            placeholder="AJD2103L"
          />
        </FormControl>

        <FormControl>
          <FormControl.Label style={{ alignItems: "center" }}>
            Car Model and Colour
          </FormControl.Label>
          <Input
            value={modelAndColour}
            onChangeText={(event) => setModelAndColour(event)}
            variant="underlined"
            size="lg"
            placeholder="Mercedes Vito Red"
          />
        </FormControl>

        <FormControl.Label style={{ alignItems: "center" }}>
          Capacity
        </FormControl.Label>
        <DropdownPicker
          open={capacityOpen}
          value={capacity}
          items={capacityItems}
          setOpen={setCapacityOpen}
          setValue={setCapacity}
          setItems={setCapacityItems}
          style={{
            backgroundColor: "black",
          }}
          textStyle={{
            color: "white",
          }}
          placeholder={4}
          dropDownContainerStyle={{
            backgroundColor: "#202020",
          }}
        />
        <View
          style={{
            height: 2.5,
            backgroundColor: "gray",
            marginBottom: 15,
          }}
        />

        <FormControl.Label style={{ alignItems: "center" }}>
          Fuel Type
        </FormControl.Label>
        <DropdownPicker
          open={fuelTypeOpen}
          value={fuelType}
          items={fuelTypeItems}
          setOpen={setFuelTypeOpen}
          setValue={setFuelType}
          setItems={setFuelTypeItems}
          style={{
            backgroundColor: "black",
          }}
          textStyle={{
            color: "white",
          }}
          placeholder={"92"}
          dropDownContainerStyle={{
            backgroundColor: "#202020",
          }}
        />

        <View
          style={{
            height: 2.5,
            backgroundColor: "gray",
            marginBottom: 15,
          }}
        />

        <Button
          variant="outline"
          style={{ marginTop: 30 }}
          onPress={handleNext}
        >
          Next
        </Button>
      </Stack>
    </View>
  );
};

export default RegisterDetails;
