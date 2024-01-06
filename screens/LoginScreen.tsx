import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { LOGIN_COLORS, SCREEN_WIDTH } from "../constants/style";
import LoginInput from "../src/user/ui/LoginInput";
import { useState } from "react";
import { getLogin } from "../src/user/module/api/login";
import { useUserStore } from "../store/login";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

type LoginProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 버튼 클릭 시 실행되는 함수
  const onSubmitLoginForm = async () => {
    setIsPressed(true);

    if (id && password) {
      try {
        const response = await getLogin({ id, password });

        useUserStore.setState(response.data, true);

        console.log("[Login] userStore", useUserStore.getState());

        navigation.navigate("FrameScreen");
      } catch (error: any) {
        alert(error.response.data.message);
        setIsPressed(false);
      }
    } else {
      alert("아이디와 비밀번호를 입력해주세요.");
      setIsPressed(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>로그인</Text>
      </View>
      <View style={styles.body}>
        <LoginInput inputType="ID" value={id} onChangeText={setId} />
        <LoginInput
          inputType="PW"
          value={password}
          onChangeText={setPassword}
        />

        <Button
          mode="contained"
          style={styles.buttonView}
          loading={isPressed}
          onPress={onSubmitLoginForm}
        >
          <Text>로그인</Text>
        </Button>

        <Text style={styles.loginInfo}>
          ※ 23:30 ~ 00:30 사이에는 로그인 오류가 있을 수 있습니다.
        </Text>
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
    backgroundColor: LOGIN_COLORS.background,
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
    backgroundColor: LOGIN_COLORS.loginButton,
  },
  loginInfo: {
    color: LOGIN_COLORS.loginInfo,
    marginTop: 5,
    marginHorizontal: 20,
  },
});
