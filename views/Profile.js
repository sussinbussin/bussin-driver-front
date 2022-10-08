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
  Pressable,
  Flex,
} from "native-base";
import { useContext, useState } from "react";
import TopBarBack from "../components/TopBarBack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalContext } from "../contexts/global";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Profile = () => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.profile) return null;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View>
      <TopBarBack></TopBarBack>
      <Pressable
        // onPress={() => {
        //   console.log("edit profile");
        // }}
      >
        <Flex style={{ marginTop: 5, marginBottom: 5 }} flexDirection="row">
          <View>
            <AntDesign
              name="user"
              size={60}
              color="pink"
              style={{ marginLeft: 25, marginRight: 25 }}
            />
          </View>

          <View style={{ flex: 2, marginTop: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Jolene</Text>

            <View flexDirection="row">
              <AntDesign
                name="star"
                size={15}
                color="white"
                style={{ marginTop: 3, marginRight: 7.5 }}
              />

              <Text style={{ fontSize: 16 }}>69.69</Text>
            </View>
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
              <Text style={{ fontSize: 15, flex: 7 }}>Scheduled</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={{
                  marginTop: 3,
                  marginLeft: 10,
                  flex: 1,
                }}
              />
            </Pressable>

            <View
              style={{
                height: 1,
                backgroundColor: "gray",
                marginTop: 15,
                marginBottom: 15,
              }}
            />
            <Pressable
              // onPress={() => {
              //   console.log("ride stats");
              // }}
              flexDirection="row"
            >
              <Text style={{ fontSize: 15, flex: 7 }}>Ride statistics</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={{
                  marginTop: 3,
                  marginLeft: 10,
                  flex: 1,
                }}
              />
            </Pressable>

            <View
              style={{
                height: 1,
                backgroundColor: "gray",
                marginTop: 15,
                marginBottom: 15,
              }}
            />
            <Pressable
              // onPress={() => {
              //   console.log("saved");
              // }}
              flexDirection="row"
            >
              <Text style={{ fontSize: 15, flex: 7 }}>Saved Places</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={{
                  marginTop: 3,
                  marginLeft: 10,
                  flex: 1,
                }}
              />
            </Pressable>

            <View
              style={{
                height: 1,
                backgroundColor: "gray",
                marginTop: 15,
                marginBottom: 15,
              }}
            />

            <Pressable
              // onPress={() => {
              //   console.log("emergency");
              // }}
              flexDirection="row"
            >
              <Text style={{ fontSize: 15, flex: 7 }}>Emergency Contacts</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={{
                  marginTop: 3,
                  marginLeft: 10,
                  flex: 1,
                }}
              />
            </Pressable>

            <View
              style={{
                height: 1,
                backgroundColor: "gray",
                marginTop: 15,
                marginBottom: 15,
              }}
            />

            <Pressable
              // onPress={() => {
              //   console.log("payment settings");
              // }}
              flexDirection="row"
            >
              <Text style={{ fontSize: 15, flex: 7 }}>Payment Settings</Text>
              <AntDesign
                name="right"
                size={15}
                color="white"
                style={{
                  marginTop: 3,
                  marginLeft: 10,
                  flex: 1,
                }}
              />
            </Pressable>

            <View
              style={{
                height: 1,
                backgroundColor: "gray",
                marginTop: 15,
                marginBottom: 15,
              }}
            />
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 10 }}>
            General
          </Text>

          <View style={{ width: "100%" }}>
            <Pressable
              // onPress={() => {
              //   console.log("halp");
              // }}
              flexDirection="row"
            >
              <Text style={{ fontSize: 15, flex: 7 }}>Help Centre</Text>
              <AntDesign
                name="right"
                size={15}
                color="white"
                style={{
                  marginTop: 3,
                  marginLeft: 10,
                  flex: 1,
                }}
              />
            </Pressable>

            <View
              style={{
                height: 1,
                backgroundColor: "gray",
                marginTop: 15,
                marginBottom: 15,
              }}
            />

            <Pressable
              // onPress={() => {
              //   console.log("settings");
              // }}
              flexDirection="row"
            >
              <Text style={{ fontSize: 15, flex: 7 }}>Settings</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={{
                  marginTop: 3,
                  marginLeft: 10,
                  flex: 1,
                }}
              />
            </Pressable>

            <View
              style={{
                height: 1,
                backgroundColor: "gray",
                marginTop: 15,
                marginBottom: 15,
              }}
            />

            <Pressable
              // onPress={() => {
              //   console.log("feedback");
              // }}
              flexDirection="row"
            >
              <Text style={{ fontSize: 15, flex: 7 }}>Feedback</Text>

              <AntDesign
                name="right"
                size={15}
                color="white"
                style={{
                  marginTop: 3,
                  marginLeft: 10,
                  flex: 1,
                }}
              />
            </Pressable>

            <View
              style={{
                height: 1,
                backgroundColor: "gray",
                marginTop: 15,
                marginBottom: 15,
              }}
            />
          </View>
        </View>
      </Box>

      {/* white space if i don't add this box in ??? */}
      <Box style={{ height: 300 }}></Box>
    </View>
  );
};

export default Profile;
