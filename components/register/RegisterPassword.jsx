import { Heading, View, Text, Input, Stack, Button } from "native-base";
import TopBarBack from "../TopBarBack";
import { useState, useContext } from "react";
import { RegisterContext } from "../../contexts/register";
const RegisterPassword = ({ navigation }) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const state = useContext(RegisterContext);

  const handleNext = () => {
    //TODO: handle invalid passwords properly with error messages
    if (password1.length == 0) return;
    if (password1 !== password2) {
      setPassword1("");
      setPassword2("");
      return;
    }
    state.password = password1;
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
        Final stretch!
      </Heading>
      <Text
        style={{
          alignSelf: "flex-start",
          paddingLeft: 30,
        }}
      >
        Please fill in your password.
      </Text>
      <Stack
        style={{
          paddingVertical: 30,
        }}
        w="85%"
      >
        <Input
          style={{
            paddingTop: 20,
          }}
          value={password1}
          onChangeText={(event) => setPassword1(event)}
          variant="underlined"
          type="password"
          size="lg"
          placeholder="Password"
        />
        <Input
          style={{
            paddingTop: 20,
          }}
          value={password2}
          onChangeText={(event) => setPassword2(event)}
          variant="underlined"
          type="password"
          size="lg"
          placeholder="Confirm Password"
        />
        <Button
          variant="outline"
          style={{ marginTop: 30 }}
          onPress={handleNext}
        >
          Complete
        </Button>
      </Stack>
    </View>
  );
};

export default RegisterPassword;
