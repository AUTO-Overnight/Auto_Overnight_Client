import { StyleSheet, View } from "react-native";
import CustomButton from "../../../../components/global/CustomButton";

// TODO: 타입 정의
const SelectionButtonGroup = ({ onReset, onTodayPress }: any) => (
  <View style={styles.view}>
    <CustomButton
      title='초기화'
      onPress={onReset}
      titleColor='#1860B4'
      buttonColor='none'
      iconName='refresh'
      iconColor='#1860B4'
    />
    <CustomButton
      title='오늘 날짜 보기'
      onPress={onTodayPress}
      titleColor='#1860B4'
      buttonColor='none'
    />
  </View>
);

export default SelectionButtonGroup;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    alignItems: "flex-start",
  },
});
