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
import { useLoginApi } from "../api/LoginApi";
import { useUserApi } from "../api/UsersApi";
import * as SecureStore from "expo-secure-store";

const Login = ({ navigation }) => {
  //used for feature toggling
  const { state, dispatch } = useContext(GlobalContext);
  if (!state.flags.login) return null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useLoginApi(username, password);

  const handlePassword = (value) => setPassword(value);
  const handleUsername = (value) => setUsername(value);

  const submit = async () => {
    //for development
    if (username == "" || password == "") {
      if (!state.flags.requireLogin) {
        navigation.navigate("Home");
      }
      return;
    }
    
    let authNRes = await loginUser();
    let token = authNRes.authToken;
    let email = authNRes.email;

    if (!token) {
      //handle invalid user
      console.log("Invalid user");
      return;
    }

    let user = await useUserApi(token).getUser(email);
    if (!user) {
      //this one hong gan lo
      return;
    }

    await SecureStore.setItemAsync(
      "idToken",
      JSON.stringify(token).replace(/['"]+/g, "")
    );
    await SecureStore.setItemAsync(
      "uuid",
      JSON.stringify(user.id).replace(/['"]+/g, '')
    );

    if (user.isDriver === true) {
      let fullUser = await useUserApi(token).getFullUserByUuid(JSON.stringify(user.id).replace(/['"]+/g, ''));
      await SecureStore.setItemAsync(
        "carPlate",
        JSON.stringify(fullUser.driver.carPlate).replace(/['"]+/g, '')
      );
      
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
      navigation.navigate("Home");
    } else {
      navigation.navigate("RegisterDriver");
    }
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
