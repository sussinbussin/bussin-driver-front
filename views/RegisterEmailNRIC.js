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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/global";
import { Alert } from "react-native";
import { useRegisterUserAPI } from "../api/RegisterUserAPI";
import TopBar from "../components/TopBar";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const RegisterEmailNRIC = ({ navigation, route }) => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.registerName) return null;

  const [name, setName] = useState("");
  const [nric, setNRIC] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(new Date());
  const [userCreationDTO, setUserCreationDTO] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { createUser } = useRegisterUserAPI(userCreationDTO);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDateSelect = (date) => {
    setDob(date)
    hideDatePicker();
  };

  const registerUser = async function () {
    const usernameValue = route.params.username;
    const passwordValue = route.params.password;
    const phoneNumValue = route.params.phoneNum;
    console.log(usernameValue)
    console.log(passwordValue)
    console.log(phoneNumValue)
    console.log(nric)
    console.log(name)
    console.log(email)
    console.log(dob)

    let userCreationDTO = {
      "password": passwordValue,
      "username": usernameValue,
      "userDTO": {
        "nric": nric,
        "name": name,
        "address": "place_id:ChIJ483Qk9YX2jERA0VOQV7d1tY",
        "dob": "2000-10-09T00:46:18.784Z",
        "mobile": phoneNumValue,
        "email": email,
        "isDriver": true
      }
    };
    setUserCreationDTO(userCreationDTO);

    return await createUser(userCreationDTO)
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
              Enter your NRIC
            </FormControl.Label>
            <Input
              value={nric}
              placeholder={"NRIC"}
              onChangeText={(text) => setNRIC(text)}
              variant="underlined"
              size="lg"
            />
            <FormControl.Label style={{ marginTop: 15 }}>
              Enter your name
            </FormControl.Label>
            <Input
              value={name}
              placeholder={"Name"}
              onChangeText={(text) => setName(text)}
              variant="underlined"
              size="lg"
            />
            <FormControl.Label style={{ marginTop: 15 }}>
              Enter your email address
            </FormControl.Label>
            <Input
              value={email}
              placeholder={"Email@mail.com"}
              onChangeText={(text) => setEmail(text)}
              variant="underlined"
              size="lg"
            />
            <FormControl.Label style={{ marginTop: 15 }}>
              Enter your date of birth
            </FormControl.Label>
            <HStack>
              <Button
                onPress={showDatePicker}
                style={{
                  paddingLeft: 0,
                }}
              >
                {dayjs(dob).format("DD/MM/YYYY")}
              </Button>
            </HStack>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateSelect}
              onCancel={hideDatePicker}
            />
            <Button
              onPress={registerUser}
              w="100%"
              style={{ marginTop: 30 }}
              variant="outline"
            >
              Next
            </Button>
          </Center>
        </Stack>
      </Box>
    </View>
  );
};

export default RegisterEmailNRIC;
