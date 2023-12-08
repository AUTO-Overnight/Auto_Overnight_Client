import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LoginScreen from "../LoginScreen";
import MainTab from "../tab/MainTab";
import SettingScreen from "../SettingScreen";
import { SCREEN_WIDTH } from "../../constants/style";
import WeatherScreen from "../WeatherScreen";

const FrameScreen = () => {
  const [mode, setMode] = useState<
    "white-balance-sunny" | "moon-waxing-crescent"
  >("white-balance-sunny");
  const [currentTab, setCurrentTab] = useState("Home");

  const _handleMode = () => {
    setMode(
      mode === "white-balance-sunny"
        ? "moon-waxing-crescent"
        : "white-balance-sunny"
    );
  };

  const Tab = createMaterialBottomTabNavigator();

  let content;
  switch (currentTab) {
    case "Home":
      content = <MainTab />;
      break;
    case "Notifications":
      content = <WeatherScreen />;
      break;
    case "Profile":
      content = <SettingScreen />;
      break;
    default:
      content = <Text>...Loading</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Appbar.Header>
          <Appbar.Content title='외박 신청' />
          <Appbar.Action icon={mode} onPress={_handleMode} />
        </Appbar.Header>
      </View>
      <View style={styles.content}>{content}</View>
      <View style={styles.bottom}>
        <Tab.Navigator initialRouteName='Home' activeColor='#e91e63'>
          <Tab.Screen
            name='Notifications'
            component={MainTab}
            options={{
              tabBarLabel: "Updates",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name='bell' color={color} size={26} />
              ),
            }}
            listeners={{
              tabPress: (e) => {
                setCurrentTab("Notifications");
              },
            }}
          />
          <Tab.Screen
            name='Home'
            component={LoginScreen}
            options={{
              tabBarLabel: "외박 신청",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name='home' color={color} size={26} />
              ),
            }}
            listeners={{
              tabPress: (e) => {
                setCurrentTab("Home");
              },
            }}
          />
          <Tab.Screen
            name='Profile'
            component={SettingScreen}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name='account'
                  color={color}
                  size={26}
                />
              ),
            }}
            listeners={{
              tabPress: (e) => {
                setCurrentTab("Profile");
              },
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    width: SCREEN_WIDTH,
  },
  content: {
    flex: 8,
    width: SCREEN_WIDTH,
  },
  bottom: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: "flex-end",
    backgroundColor: "purple",
  },
});

export default FrameScreen;
