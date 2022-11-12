import { Heading, Box, Flex, Pressable, Text, Center } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const TopBarBack = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const backNavigate = () => {
    navigation.goBack();
  };
  return (
    <Flex
      style={{
        paddingTop: insets.top,
        paddingBottom: 10,
        backgroundColor: 0,
        width: "100%",
      }}
      flexDirection="row"
    >
      <Box style={{ flex: 1, backgroundColor: 0 }}>
        <Pressable onPress={backNavigate}>
          <AntDesign
            name="left"
            size={20}
            color="white"
            style={{
              textAlign: "left",
              marginLeft: 25,
              marginTop: 10,
            }}
          />
        </Pressable>
      </Box>
      <Center style={{ flex: 1 }}>
        <Heading style={{ textAlign: "center", backgroundColor: 0 }}>
          Bussin.
        </Heading>
        <Text fontSize="xs">Driver</Text>
      </Center>

      <Box style={{ flex: 1, backgroundColor: 0 }}></Box>
    </Flex>
  );
};

export default TopBarBack;
