import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import RegisterName from "../components/register/RegisterName";
import RegisterDetails from "../components/register/RegisterDetails";
import RegisterCar from "../components/register/RegisterCar";
import RegisterPassword from "../components/register/RegisterPassword";
import RegisterComplete from "../components/register/RegisterComplete";
import { initialState, RegisterContext } from "../contexts/register";

const RegisterNew = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  return (
    <RegisterContext.Provider value={initialState}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="RegisterName" component={RegisterName} />
        <Stack.Screen name="RegisterDetails" component={RegisterDetails} />
        <Stack.Screen name="RegisterCar" component={RegisterCar} />
        <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
        <Stack.Screen name="RegisterComplete" component={RegisterComplete} />
      </Stack.Navigator>
    </RegisterContext.Provider>
  );
};

export default RegisterNew;
