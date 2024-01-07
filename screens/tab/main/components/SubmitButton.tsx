import { StyleSheet, View } from "react-native";
import CustomButton from "../../../../components/global/CustomButton";

const SubmitButton = ({ onSubmit }: any) => (
  <View style={styles.view}>
    <CustomButton title='신청하기' onPress={onSubmit} flex={1} />
  </View>
);

export default SubmitButton;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});
