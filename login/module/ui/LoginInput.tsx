import { useState } from "react";
import { TextInput } from "react-native-paper";

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
      activeOutlineColor="#1F2937"
      secureTextEntry={isPassword}
      style={{ marginVertical: 3, marginHorizontal: 20 }}
      left={<TextInput.Icon icon={iconName} />}
    />
  );
}
