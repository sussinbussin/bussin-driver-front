import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text, Box, extendTheme, View } from "native-base";
import { useReducer } from "react";
import { useColorScheme } from "react-native";
import {
  GlobalContext,
  globalReducer,
  initState,
  initialState,
} from "./contexts/global";
import darkModeTheme from "./theming/dark";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import RegisterName from "./views/RegisterName";
import ScheduledRides from "./views/ScheduledRides";

const Stack = createNativeStackNavigator();
const App = () => {
  const colorScheme = useColorScheme();
  const [state, dispatch] = useReducer(globalReducer, initialState, initState);
  const theme = extendTheme(colorScheme === "dark" ? darkModeTheme : {});
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name = "RegisterName" component={RegisterName} />
            <Stack.Screen name = "ScheduledRides" component={ScheduledRides} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar></StatusBar>
      </NativeBaseProvider>
    </GlobalContext.Provider>
  );
};

export default App;