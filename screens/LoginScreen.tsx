import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import { Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../constants/style";
import LoginInput from "../components/login/LoginInput";
import { useState } from "react";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

type LoginProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [isPressed, setIsPressed] = useState(false);

  function isPressedBtn() {
    setIsPressed(!isPressed);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>로그인</Text>
      </View>
      <View style={styles.body}>
        <LoginInput inputType='ID' />
        <LoginInput inputType='PW' />

        <Button
          mode='contained'
          style={styles.buttonView}
          buttonColor='#1F2937'
          loading={isPressed}
          onPress={() => isPressedBtn()}>
          <Text>로그인</Text>
        </Button>
      </View>
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
    alignItems: "center",
    marginTop: 50,
  },
  body: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  buttonView: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 5,
  },
});
