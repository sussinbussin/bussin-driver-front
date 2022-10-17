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
import { useLoginAPI } from "../api/LoginApi";
import { useUserApi } from "../api/UsersApi";
import * as SecureStore from "expo-secure-store";
import TopBar from "../components/TopBar";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const RegisterEmailNRIC = ({ navigation, route }) => {
  const { state, dispatch } = useContext(GlobalContext);

  if (!state.flags.registerName) return null;

  const username = route.params.username;
  const password = route.params.password;
  const [name, setName] = useState("");
  const [nric, setNRIC] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [dob, setDob] = useState(new Date());
  const [userCreationDTO, setUserCreationDTO] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { createUser } = useUserApi(userCreationDTO);

  const { loginUser } = useLoginAPI(username, password);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDateSelect = (date) => {
    setDob(date);
    hideDatePicker();
  };

  const registerUser = async function () {
    const phoneNumValue = route.params.phoneNum;

    let userCreationDTO = {
      password: password,
      username: username,
      userDTO: {
        nric: nric,
        name: name,
        dob: dob,
        mobile: phoneNumValue,
        email: emailValue,
        isDriver: false,
      },
    };
    setUserCreationDTO(userCreationDTO);
    await createUser(userCreationDTO);

    let authNRes = await loginUser();
    let token = authNRes.authToken;
    let email = authNRes.email;
    const { getUser } = useUserAPI(token, email);
    let user = await getUser();
    console.log("Found user " + user);
    if (!user) {
      return;
    }
    console.log("Got user " + JSON.stringify(user));

    dispatch({ type: "SET_USER", payload: user });
    dispatch({
      type: "MODIFY_STAGE",
      payload: {
        ...state.stage,
        locationSearch: {
          text: `Where to, ${user.name}?`,
        },
      },
    });
    dispatch({
      type: "SET_TOKEN",
      payload: token,
    });

    await SecureStore.setItemAsync(
      "idToken",
      JSON.stringify(token).replace(/['"]+/g, "")
    );

    await SecureStore.setItemAsync(
      "uuid",
      JSON.stringify(user.id).replace(/['"]+/g, "")
    );

    navigation.navigate("RegisterDriver", {
      userData: user,
    });
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
              value={emailValue}
              placeholder={"Email@mail.com"}
              onChangeText={(text) => setEmailValue(text)}
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
              Register
            </Button>
          </Center>
        </Stack>
      </Box>
    </View>
  );
};

export default RegisterEmailNRIC;
