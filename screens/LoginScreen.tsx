import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import { Button, Text, View } from "react-native";
import { StyleSheet } from "react-native";

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
      <Text>Login Page</Text>
      <Button
        title='Go to Home'
        onPress={() => navigation.navigate("MainScreen")}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
});
