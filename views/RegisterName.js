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
  import { Alert, Parse } from "react-native";
  import TopBar from "../components/TopBar";
  
  const RegisterName = () => {
    // for stuff like username, email, name, dob etc.
    const { state } = useContext(GlobalContext);
    if (!state.flags.registerName) return null;
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const RegisterUser = async function () {
      const usernameValue = username;
      const passwordValue = password;
  
      // idk need update
      return await Parse.User.signup(usernameValue, passwordValue)
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
                Choose a Username
              </FormControl.Label>
              <Input
                value={username}
                placeholder={"Username"}
                onChangeText={(text) => setUsername(text)}
                variant="underlined"
                size="lg"
              />
              <FormControl.Label style={{ marginTop: 15 }}>
                Choose a Password
              </FormControl.Label>
              <Input
                value={password}
                placeholder={"Password"}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                variant="underlined"
                size="lg"
              />
  
              {/* can bring to set email or something */}
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
  
  export default RegisterName;
  