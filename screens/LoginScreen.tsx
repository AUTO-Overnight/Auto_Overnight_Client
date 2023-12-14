import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../constants/style";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

type LoginProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Login Page</Text>
      </View>
      <Button icon='camera' onPress={() => navigation.navigate("FrameScreen")}>
        Press Me
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
});
