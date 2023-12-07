import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "./types/navigationTypes";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import WeatherScreen from "./screens/WeatherScreen";
import SplashScreen from "./screens/SplashScreen";
import BonusPointScreen from "./screens/BonusPointScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
