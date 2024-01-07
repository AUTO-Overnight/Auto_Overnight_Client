import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MainTab from "../tab/MainTab";
import { SCREEN_WIDTH } from "../../constants/style";
import { ICON_NAME } from "../../constants/icon";
import SettingTab from "../tab/SettingTab";
import BonusPointScreen from "../BonusPointScreen";
import { RootStackParamList } from "../../types/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from "@react-navigation/native";
import { ROUTES } from "../../constants/rules";
import { useStore } from "../../store/store";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

type LoginProps = {
  navigation: LoginScreenNavigationProp;
  route: RouteProp<RootStackParamList, "FrameScreen">; // route 타입을 추가합니다.
};

const FrameScreen: React.FC<LoginProps> = ({ navigation, route }) => {
  const { toggleMode } = useStore(); // Zustand 스토어에서 toggleMode 가져오기
  const [mode, setMode] = useState(ICON_NAME.lightMode); // 초기 모드 상태 설정

  const _handleMode = () => {
    toggleMode(); // 다크모드/라이트모드 상태 전환
    setMode(
      mode === ICON_NAME.lightMode ? ICON_NAME.darkMode : ICON_NAME.lightMode
    );
    console.log("mode: ", mode);
  };

  const Tab = createMaterialBottomTabNavigator();

  // Appbar.Content title을 현재 위치한 탭의 이름으로 변경하도록 설정하는 코드 작성
  // TODO: any 제거
  const getHeaderTitle = (route: any) => {
    // 현재 포커스된 라우트 이름을 얻습니다.
    const routeName = getFocusedRouteNameFromRoute(route) ?? ROUTES.defaultTab;

    switch (routeName) {
      case ROUTES.defaultTab:
        return ROUTES.defaultView;
      case ROUTES.scoreTab:
        return ROUTES.scoreView;
      case ROUTES.settingTab:
        return ROUTES.settingView;
      default:
        return ROUTES.defaultView;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Appbar.Header style={styles.background} mode='small'>
          <Appbar.Content title={getHeaderTitle(route)} />
          <Appbar.Action icon={mode} onPress={_handleMode} />
        </Appbar.Header>
      </View>
      <View style={styles.bottom}>
        <Tab.Navigator
          initialRouteName={ROUTES.defaultTab}
          activeColor='#252525'
          inactiveColor='#AEAEAE'
          theme={{ colors: { secondaryContainer: "transperent" } }}
          barStyle={styles.barStyle}>
          <Tab.Screen
            name={ROUTES.scoreTab}
            component={BonusPointScreen}
            options={{
              tabBarLabel: ROUTES.scoreView,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name={ICON_NAME.trophy}
                  color={color}
                  size={30}
                />
              ),
            }}
          />
          <Tab.Screen
            name={ROUTES.defaultTab}
            component={MainTab}
            options={{
              tabBarLabel: ROUTES.defaultView,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name={ICON_NAME.home}
                  color={color}
                  size={30}
                />
              ),
            }}
          />
          <Tab.Screen
            name={ROUTES.settingTab}
            component={SettingTab}
            options={{
              tabBarLabel: ROUTES.settingView,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name={ICON_NAME.setting}
                  color={color}
                  size={30}
                />
              ),
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
  },
  header: {
    width: SCREEN_WIDTH,
  },
  background: {
    backgroundColor: "#fff",
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
  },
  barStyle: {
    backgroundColor: "#fff",
    borderTopColor: "#e8e8e8",
    borderTopWidth: 2,
    height: 100,
  },
});

export default FrameScreen;

// 언제나 children을 넣어서 관리를 하는 것이 옳은 방법은 아니다.
// children을 넣어서 레이아웃처럼 제작하려 했으나, 양 측 파일들에서 상호 참조가 발생하면서 상태를 관리하도록 설정하였다.
// switch case를 활용하여 현재 탭을 관리하고, 각 탭에 맞는 컴포넌트를 렌더링하도록 하였다.
