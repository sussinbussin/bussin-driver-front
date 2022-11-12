import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme } from "native-base";
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
import Profile from "./views/Profile";
import EditProfile from "./views/EditProfile";
import RegisterNew from "./views/RegisterNew";
import ScheduledRides from "./views/ScheduledRides";
import VehicleSettings from "./views/VehicleSettings";

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
              gestureEnabled: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="RegisterNew" component={RegisterNew} />
            <Stack.Screen name="ScheduledRides" component={ScheduledRides} />
            <Stack.Screen name="VehicleSettings" component={VehicleSettings} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar></StatusBar>
      </NativeBaseProvider>
    </GlobalContext.Provider>
  );
};

export default App;
