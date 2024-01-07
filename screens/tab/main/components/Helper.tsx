import { StyleSheet, Text, View } from "react-native";

type HelperProps = {
  text: string;
};

const Helper: React.FC<HelperProps> = ({ text }) => (
  <View style={styles.view}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E7EFFF",
  },
  text: {
    fontWeight: "bold",
  },
});

export default Helper;
