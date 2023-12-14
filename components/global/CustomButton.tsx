import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

type CustomButtonProps = {
  title?: string;
  buttonColor?: string;
  titleColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title = "untitled",
  buttonColor = "#000",
  titleColor = "#fff",
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={onPress}>
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 5,
    paddingVertical: 10,
  },
  title: {
    fontSize: 15,
  },
});

export default CustomButton;
