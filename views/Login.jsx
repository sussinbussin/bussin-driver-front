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
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../contexts/global";
import TopBar from "../components/TopBar";
import { useLoginApi } from "../api/LoginApi";
import { useUserApi } from "../api/UsersApi";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";

const Login = ({ navigation }) => {
  //used for feature toggling
  const { state, dispatch } = useContext(GlobalContext);
  if (!state.flags.login) return null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useLoginApi(username, password);

  const handlePassword = (value) => setPassword(value);
  const handleUsername = (value) => setUsername(value);

  useEffect(() => {
    if (!state.biometrics) return;

    (async () => {
      //check if supported
      const compat = await LocalAuthentication.hasHardwareAsync();
      if (!compat) return;
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) return;
      //check if user logged in
      let token = await SecureStore.getItemAsync("idToken");
      if (!token) return;

      const check = await LocalAuthentication.authenticateAsync();
      if (!check.success) return;

      const decodedToken = jwtDecode(token);
      const { getUser } = useUserApi(token);
      let user = await getUser(decodedToken.email);
      if (!user) return;

      dispatch({ type: "SET_DRIVER", payload: user });
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
      navigation.navigate("Home");
    })();
  }, []);
  const submit = async () => {
    //for development
    if (username == "" || password == "") {
      if (!state.flags.requireLogin) {
        navigation.navigate("Home");
      }
      return;
    }

    let { token, email } = await loginUser();
    if (!token) {
      //handle invalid user
      return;
    }
    const { getUser, getFullUserByUuid } = useUserApi(token);
    let user = await getUser(email);
    if (!user) {
      return;
    }

    if (!user.isDriver) {
      navigation.navigate("RegisterDriver");
      return;
    }

    //get more details
    let data = await getFullUserByUuid(user.id);
    if (!data) {
      return;
    }

    await SecureStore.setItemAsync("uuid", user.id)

    dispatch({ type: "SET_DRIVER", payload: data });
    dispatch({
      type: "MODIFY_STAGE",
      payload: {
        ...state.stage,
        locationSearch: {
          text: `New drive, ${user.name}?`,
        },
      },
    });
    dispatch({
      type: "SET_TOKEN",
      payload: token,
    });

    navigation.navigate("Home");
    await SecureStore.setItemAsync("idToken", token);
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
              navigation.navigate("RegisterNew");
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
