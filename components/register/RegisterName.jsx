import { Heading, View, Input, Text, Button } from "native-base";
import { useContext, useEffect, useRef, useState } from "react";
import Lottie from "lottie-react-native";
import TopBarBack from "../TopBarBack";
import { RegisterContext } from "../../contexts/register";

const RegisterName = ({ navigation }) => {
  const lottieRef = useRef();
  const [name, setName] = useState();
  const [nextDisabled, setNextDisabled] = useState(true);
  const [nextPressed, setNextPressed] = useState(false);
  const state = useContext(RegisterContext);

  useEffect(() => {
    lottieRef.current?.play();
  }, []);

  const handleSubmit = () => {
    lottieRef.current?.play(100, 0);
    setNextPressed(true);
    state.name = name;
  };

  const handleName = (event) => {
    event.length > 0 ? setNextDisabled(false) : setNextDisabled(true);
    setName(event);
  };

  const handleAnimationFinish = () => {
    if (nextPressed) navigation.navigate("RegisterDetails");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBarBack />
      <Lottie
        source={require("../../assets/location.json")}
        ref={lottieRef}
        loop={false}
        style={{
          width: 300,
        }}
        onAnimationFinish={handleAnimationFinish}
      />
      <Heading
        size="xl"
        style={{
          alignSelf: "flex-start",
          paddingLeft: 30,
        }}
      >
        Welcome!
      </Heading>
      <Text
        fontSize="md"
        style={{
          alignSelf: "flex-start",
          paddingLeft: 30,
          paddingVertical: 10,
        }}
      >
        How can we address you?
      </Text>
      <Input
        placeholder="Jolene Yeo"
        variant="underlined"
        size="lg"
        w="85%"
        value={name}
        onChangeText={handleName}
      />

      <Button
        w="85%"
        variant="outline"
        style={{ marginTop: 30 }}
        disabled={nextDisabled}
        onPress={handleSubmit}
      >
        Next
      </Button>
    </View>
  );
};

export default RegisterName;
