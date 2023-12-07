import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import { SCREEN_WIDTH } from "../constants/style";
import { Calendar } from "react-native-calendars";
import { useState } from "react";

type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainScreen"
>;

type MainProps = {
  navigation: MainScreenNavigationProp;
};

const MainScreen: React.FC<MainProps> = ({ navigation }) => {
  const [mode, setMode] = useState<
    "white-balance-sunny" | "moon-waxing-crescent"
  >("white-balance-sunny");
  const _handleMode = () => {
    setMode(
      mode === "white-balance-sunny"
        ? "moon-waxing-crescent"
        : "white-balance-sunny"
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Appbar.Header>
          <Appbar.Content title='외박 신청' />
          <Appbar.Action icon={mode} onPress={_handleMode} />
        </Appbar.Header>
      </View>
      <View style={styles.content}>
        <Calendar
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
        />
      </View>
      <View style={styles.bottom}></View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
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
  },
});
