import {
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
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/global";
import TopBar from "../components/TopBar";
import { useLoginAPI } from "../api/LoginApi";
import * as SecureStore from "expo-secure-store";

const Login = ({ navigation }) => {
  //used for feature toggling
  const { state } = useContext(GlobalContext);
  if (!state.flags.login) return null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useLoginAPI(username, password);

  const handlePassword = (value) => setPassword(value);
  const handleUsername = (value) => setUsername(value);

  const submit = async () => {
    if (username == "" || password == "") {
      //TODO: handle invalid input
    }
    const token = await loginUser();
    console.log(token);
    if (token.error) {
      setPassword("");
      return;
    }
    await SecureStore.setItemAsync(
      "token",
      token.AuthenticationResult.AccessToken
    );
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBar></TopBar>
      <Heading size="xl" style={{ paddingTop: 30 }}>
        Welcome
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
          <Center style={{ paddingTop: 30 }}>
            <FormControl.Label style={{ alignItems: "center" }}>
              Username
            </FormControl.Label>
            <Input
              type="text"
              placeholder="Username"
              onChangeText={handleUsername}
              variant="underlined"
              size="lg"
            />
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              placeholder="Password"
              onChangeText={handlePassword}
              variant="underlined"
              size="lg"
            />
            <Button
              onPress={submit}
              w="100%"
              style={{ marginTop: 30 }}
              variant="outline"
            >
              Sign In
            </Button>
          </Center>
        </Stack>
      </Box>

      <View>
        <Center>
          <Text style={{ marginTop: 9 }} fontSize="15">
            No account yet?
          </Text>
          <Text
            onPress={() => {
              navigation.navigate("Register");
            }}
            textAlign="center"
            paddingTop="7.5"
            w="100%"
            fontSize="16"
            fontWeight="bold"
          >
            Sign up here!
          </Text>
        </Center>
      </View>
    </View>
  );
};

export default Login;
