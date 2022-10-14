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
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  
  const RegisterEmailNRIC = ({navigation, route}) => {
    const { state } = useContext(GlobalContext);
    if (!state.flags.registerName) return null;
  
    const [nric, setNRIC] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };

    const RegisterUser = async function () {
      const usernameValue = route.params.username;
      const passwordValue = route.params.password;
      const phoneNumValue = route.params.phoneNum;
      console.log(usernameValue)
      console.log(passwordValue)
      console.log(phoneNumValue)
      console.log(dob)
      console.log(address)
  
      // idk need update
      return await useRegisterUserAPI(userCreationDTO)
        .then(() => {
          Alert.alert("yay");
          return true;
        })
        .catch((error) => {
          // TODO: check uniqueness etc etc
          Alert.alert("boooo", error.message);
          return false;
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
                Enter your address
              </FormControl.Label>
              <Input
                value={address}
                placeholder={"Address"}
                onChangeText={(text) => setAddress(text)}
                variant="underlined"
                size="lg"
              />
              <FormControl.Label style={{ marginTop: 15 }}>
                Enter your date of birth
              </FormControl.Label>
            <Button w="30%"
                style={{ marginTop: 30 }}
                variant="outline" 
                onPress={showDatePicker}>
                    Select
            </Button>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={setDob}
                onCancel={hideDatePicker}
            />
              <Button
                onPress={RegisterUser}
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
  