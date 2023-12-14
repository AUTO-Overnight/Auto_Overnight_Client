import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MainTab from "../tab/MainTab";
import { SCREEN_WIDTH } from "../../constants/style";
import WeatherScreen from "../WeatherScreen";
import { ICON_NAME } from "../../constants/icon";
import SettingTab from "../tab/SettingTab";

const FrameScreen = () => {
  const [mode, setMode] = useState<string>(ICON_NAME.lightMode);
  const [currentTab, setCurrentTab] = useState("Home");

  const _handleMode = () => {
    setMode(
      mode === ICON_NAME.lightMode ? ICON_NAME.darkMode : ICON_NAME.lightMode
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
    case "Settings":
      content = <SettingTab />;
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
              tabBarLabel: "상점/벌점",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name={ICON_NAME.trophy}
                  color={color}
                  size={26}
                />
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
            component={MainTab}
            options={{
              tabBarLabel: "외박 신청",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name={ICON_NAME.home}
                  color={color}
                  size={26}
                />
              ),
            }}
            listeners={{
              tabPress: (e) => {
                setCurrentTab("Home");
              },
            }}
          />
          <Tab.Screen
            name='Settings'
            component={SettingTab}
            options={{
              tabBarLabel: "설정",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name={ICON_NAME.setting}
                  color={color}
                  size={26}
                />
              ),
            }}
            listeners={{
              tabPress: (e) => {
                setCurrentTab("Settings");
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  bottom: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: "flex-end",
    backgroundColor: "purple",
  },
});

export default FrameScreen;

// 언제나 children을 넣어서 관리를 하는 것이 옳은 방법은 아니다.
// children을 넣어서 레이아웃처럼 제작하려 했으나, 양 측 파일들에서 상호 참조가 발생하면서 상태를 관리하도록 설정하였다.
// switch case를 활용하여 현재 탭을 관리하고, 각 탭에 맞는 컴포넌트를 렌더링하도록 하였다.
