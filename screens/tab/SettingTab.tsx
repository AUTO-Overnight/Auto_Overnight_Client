import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SCREEN_WIDTH } from "../../constants/style";

const SettingTab = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.connectDormitoryView}>
        <Text>기숙사 전화 연결</Text>
        <Text>제 1 기숙사</Text>
        <Text>제 2 기숙사</Text>
      </View>
      <View style={styles.connectDormitoryView}>
        <Text>문의하기</Text>
        <Text>설문조사</Text>
        <Text>카카오톡</Text>
      </View>
      <View style={styles.connectDormitoryView}>
        <Text>ETC</Text>
        <Text>셔틀 시간표 보기</Text>
        <Text>업데이트 내역</Text>
      </View>
      <View style={styles.connectDormitoryView}>
        <Text>로그아웃</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    gap: 20,
  },
  connectDormitoryView: {
    flex: 1,
    backgroundColor: "orange",
    height: 100,
  },
  questionsView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
  },
});

export default SettingTab;
