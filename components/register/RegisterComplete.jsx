import { View, Heading, Text } from "native-base";
import Lottie from "lottie-react-native";
import TopBar from "../TopBar";
import { useEffect, useRef, useContext } from "react";
import { useRegisterApi } from "../../api/RegisterApi";
import { RegisterContext } from "../../contexts/register";
import { useLoginApi } from "../../api/LoginApi";
import { useUserApi } from "../../api/UsersApi";
import * as SecureStore from "expo-secure-store";
import { GlobalContext } from "../../contexts/global";

const RegisterComplete = ({ navigation }) => {
  const animation = useRef();
  const heading = useRef();
  const { state, dispatch } = useContext(GlobalContext);
  const registerState = useContext(RegisterContext);

  useEffect(() => {
    (async () => {
      let formData = {
        password: registerState.password,
        username: registerState.username,
        userDTO: {
          nric: registerState.nric,
          name: registerState.name,
          dob: registerState.date.toISOString(),
          mobile: registerState.mobile,
          email: registerState.email,
          isDriver: true,
        },
      };
      const { register } = useRegisterApi();
      let result = await register(formData);
      if (!result) return;
    })();
    animation.current?.play();
  }, []);

  const handleAnimationFinish = async () => {
    const { loginUser } = useLoginApi(
      registerState.username,
      registerState.password
    );
    let { token, email } = await loginUser();
    if (!token) {
      return;
    }
    const { getUser } = useUserApi(token);
    let user = await getUser(email);
    if (!user) {
      return;
    }

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

    await SecureStore.setItemAsync("idToken", token);
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBar></TopBar>
      <Lottie
        ref={animation}
        source={require("../../assets/success.json")}
        loop={false}
        style={{ width: 300 }}
        speed={0.8}
        onAnimationFinish={handleAnimationFinish}
      />
      <Heading>Success!</Heading>
      <Text>Logging you in now</Text>
    </View>
  );
};

export default RegisterComplete;
