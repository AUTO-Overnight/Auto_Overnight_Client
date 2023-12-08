import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/navigationTypes";
import LoginScreen from "./screens/LoginScreen";
import FrameScreen from "./screens/layout/FrameScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='FrameScreen' component={FrameScreen} />
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
