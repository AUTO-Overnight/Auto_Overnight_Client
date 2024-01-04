import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import { Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../constants/style";
import LoginInput from "../login/module/ui/LoginInput";
import { useState } from "react";
import { getLogin } from "../login/module/api/login";
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
  const userStore = useUserStore.getState();

  // 로그인 API 호출
  const onSubmitLoginForm = async () => {
    setIsPressed(true);

    if (id && password) {
      try {
        const response = await getLogin({ id, password });

        userStore.set(response.data);
        console.log("[Login]userStore: ", userStore);
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
          buttonColor="#1F2937"
          loading={isPressed}
          onPress={onSubmitLoginForm}
        >
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
