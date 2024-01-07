import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type CustomButtonProps = {
  title?: string;
  buttonColor?: string;
  titleColor?: string;
  flex?: number;
  onPress?: (event: GestureResponderEvent) => void;
  iconName?: string;
  iconColor?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title = "untitled",
  buttonColor = "#000",
  titleColor = "#fff",
  flex,
  onPress = () => {},
  iconName,
  iconColor,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor, flex: flex }]}
      onPress={onPress}>
      {iconName && <Icon name={iconName} size={20} color={iconColor} />}
      <Text
        style={[
          styles.title,
          { color: titleColor, marginLeft: iconName ? 5 : 0 },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row", // 아이콘과 텍스트를 나란히 배치
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10, // 좌우 패딩
  },
  title: {
    fontSize: 15,
  },
});

export default CustomButton;
