import { Text, Box, View, Pressable, Flex } from "native-base";
import { StyleSheet } from "react-native";
import { useContext, useState } from "react";
import TopBarBack from "../components/TopBarBack";
import { GlobalContext } from "../contexts/global";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUserApi } from "../api/UsersApi";
import * as SecureStore from "expo-secure-store";

const Profile = () => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.profile) return null;
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [rendered, setRendered] = useState(false);
  const renderDefaults = async () => {
    let token = await SecureStore.getItemAsync("idToken");
    let cp = await SecureStore.getItemAsync("uuid");

    let user = await useUserApi(token).getUserByUuid(cp);

    setUsername(user.name);

    setRendered(true);
  };

  if (!rendered) {
    renderDefaults();
  }

  return (
    <View>
      <TopBarBack></TopBarBack>
      <Pressable
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      >
        <Flex style={{ marginTop: 5, marginBottom: 5 }} flexDirection="row">
          <View>
            <AntDesign
              name="user"
              size={60}
              color="white"
              style={{ marginLeft: 25, marginRight: 25 }}
            />
          </View>

          <View style={{ flex: 2, marginTop: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{username}</Text>
          </View>
          <Box style={{ flex: 1, backgroundColor: 0 }}></Box>

          <Box style={{ flex: 1, backgroundColor: 0 }}>
            <AntDesign
              name="right"
              size={15}
              color="white"
              style={{
                marginLeft: 11,
                marginTop: 13,
              }}
            />
          </Box>
        </Flex>
      </Pressable>

      <Box
        style={{
          marginTop: 15,
          marginBottom: 15,
          marginLeft: 17,
          marginRight: 17,
        }}
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 10 }}>
            My Account
          </Text>

          <View style={{ width: "100%" }}>
            <Pressable
              onPress={() => {
                navigation.navigate("ScheduledRides");
              }}
              flexDirection="row"
            >
              <Text style={styles.text}>Scheduled</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={styles.arrow}
              />
            </Pressable>

            <View style={styles.line} />
            <Pressable flexDirection="row">
              <Text style={styles.text}>Ride statistics</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={styles.arrow}
              />
            </Pressable>

            <View style={styles.line} />
            <Pressable flexDirection="row">
              <Text style={styles.text}>Saved Places</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={styles.arrow}
              />
            </Pressable>

            <View style={styles.line} />

            <Pressable flexDirection="row">
              <Text style={styles.text}>Emergency Contacts</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={styles.arrow}
              />
            </Pressable>

            <View style={styles.line} />

            <Pressable flexDirection="row">
              <Text style={styles.text}>Payment Settings</Text>
              <AntDesign
                name="right"
                size={15}
                color="white"
                style={styles.arrow}
              />
            </Pressable>

            <View style={styles.line} />
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 10 }}>
            My Vehicle
          </Text>
          <View style={{ width: "100%" }}>
            <Pressable
              onPress={() => {
                navigation.navigate("VehicleSettings");
              }}
              flexDirection="row"
            >
              <Text style={styles.text}>Vehicle Information</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={styles.arrow}
              />
            </Pressable>
            <View style={styles.line} />
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 10 }}>
            General
          </Text>

          <View style={{ width: "100%" }}>
            <Pressable flexDirection="row">
              <Text style={styles.text}>Help Centre</Text>
              <AntDesign
                name="right"
                size={15}
                color="white"
                style={styles.arrow}
              />
            </Pressable>

            <View style={styles.line} />

            <Pressable flexDirection="row">
              <Text style={styles.text}>Settings</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={styles.arrow}
              />
            </Pressable>

            <View style={styles.line} />

            <Pressable flexDirection="row">
              <Text style={styles.text}>Feedback</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={styles.arrow}
              />
            </Pressable>

            <View style={styles.line} />
          </View>
        </View>
      </Box>
      <Box style={{ height: 300 }}></Box>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: "gray",
    marginTop: 15,
    marginBottom: 15,
  },

  text: {
    fontSize: 15,
    flex: 7,
  },

  arrow: {
    marginTop: 3,
    marginLeft: 10,
    flex: 1,
  },
});

export default Profile;
