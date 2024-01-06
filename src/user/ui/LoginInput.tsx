import { TextInput } from "react-native-paper";
import { LOGIN_COLORS } from "../../../constants/style";
import { StyleSheet } from "react-native";

interface LoginInputProps {
  inputType: "ID" | "PW";
  value: string;
  onChangeText: (text: string) => void;
}

export default function LoginInput({
  inputType,
  value,
  onChangeText,
}: LoginInputProps) {
  const isPassword = inputType === "PW";
  const iconName = inputType === "ID" ? "account" : "lock";

  return (
    <TextInput
      mode="outlined"
      value={value}
      placeholder={inputType}
      onChangeText={onChangeText}
      activeOutlineColor={LOGIN_COLORS.loginButton}
      secureTextEntry={isPassword}
      style={styles.textInput}
      left={<TextInput.Icon icon={iconName} />}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 3,
    marginHorizontal: 20,
  },
});
