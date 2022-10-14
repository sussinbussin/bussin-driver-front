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
import { TextInput } from "react-native";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/global";
import TopBar from "../components/TopBar";

const Register = ({ navigation }) => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.register) return null;


  const [phoneNum, setPhoneNum] = useState("");
  const handlePhoneNum = (value) => setPhoneNum(value);

  const submit = () => {
    const phoneIsValid =
      phoneNum.length === 8 &&
      (phoneNum.toString().indexOf('8') === 0 || phoneNum.toString().indexOf('9') === 0);

    if (!phoneIsValid) {
      setPhoneNum({
        phoneNum: false,
      });
      // TODO: alert invalid number
    
    } else {
      navigation.navigate("RegisterName", {
        phoneNum: phoneNum,
      })
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBar></TopBar>
      <Heading size="xl" style={{ paddingTop: 30 }}>
        Register
      </Heading>
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
              Phone number
            </FormControl.Label>
            <Input
              type="Text"
              placeholder="Phone number"
              keyboardType="numeric"
              onChangeText={handlePhoneNum}
              maxLength={8}
              variant="underlined"
              size="lg"
            />

            <Button
              onPress={() => {
                submit();
                // idk how to navigate only if successful
                // navigation.navigate("RegisterName");
              }}
              w="100%"
              style={{ marginTop: 25 }}
              variant="outline"
            >
              Continue
            </Button>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
              <View>
                <Text style={{ width: 50, textAlign: "center", fontSize: 18 }}>
                  OR
                </Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
            </View>

            <Button
              // TODO: sign up with email
              // onPress={() => {
              //   console.log("email")
              // }}
              w="100%"
              style={{ marginTop: 30 }}
              variant="outline"
            >
              Sign up with Email
            </Button>

            <Button
              // TODO: sign up with gmail?
              // onPress={() => {
              //   console.log("gmail")
              // }}
              w="100%"
              style={{ marginTop: 22 }}
              variant="outline"
            >
              Sign up with Google
            </Button>
          </Center>
        </Stack>
      </Box>

      <View>
        <Center>
          <Text style={{ marginTop: 9 }} fontSize="15">
            Already have an account?
          </Text>
          <Text
            onPress={() => {
              navigation.navigate("Login");
            }}
            textAlign="center"
            paddingTop="7.5"
            w="100%"
            fontSize="17"
            fontWeight="bold"
          >
            LOGIN
          </Text>
        </Center>
      </View>
    </View>
  );
};

export default Register;
