import { useState } from 'react';
import { TextInput, Icon, MD3Colors } from 'react-native-paper';

interface InputProps {
  inputType: string;
}

export default function LoginInput({ inputType }: InputProps) {
  const [text, setText] = useState("");
  const isPassword = inputType === "PW";

  const iconName = inputType === "ID" ? "account" : "lock";

  return (
    <TextInput
      mode = "outlined"
      value = {text}
      placeholder = {inputType}
      onChangeText = {text => setText(text)}
      activeOutlineColor = "#1F2937"
      secureTextEntry = {isPassword}
      style={{ marginVertical: 3, marginHorizontal: 20}}
      left = {<TextInput.Icon icon={iconName}/>}
    />
  )
}