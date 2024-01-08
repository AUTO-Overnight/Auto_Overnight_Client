import { StyleSheet, View } from "react-native";
import CustomButton from "../../../../components/global/CustomButton";

type SubmitButtonProps = {
  onSubmit: () => void;
  disabled: boolean;
};

const SubmitButton = ({ onSubmit, disabled }: SubmitButtonProps) => (
  <View style={styles.view}>
    <CustomButton
      title='신청하기'
      onPress={!disabled ? onSubmit : undefined}
      flex={1}
      buttonColor={disabled ? "#ccc" : "black"} // disabled 상태에 따라 색상 변경
      titleColor={disabled ? "#999" : "white"} // 글자 색상도 변경할 수 있습니다
    />
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
