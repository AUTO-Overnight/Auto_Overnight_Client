import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import { SCREEN_WIDTH } from "../../constants/style";

const SettingTab = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>기숙사 전화 연결</Text>
        <View style={styles.contentView}>
          <Text style={styles.content}>제 1 기숙사</Text>
          <Text style={styles.content}>제 2 기숙사</Text>
        </View>
      </View>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>문의하기</Text>
        <View>
          <Text style={styles.content}>설문조사</Text>
          <Text style={styles.content}>카카오톡</Text>
        </View>
      </View>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>ETC</Text>
        <View style={styles.contentView}>
          <Text style={styles.content}>셔틀 시간표 보기</Text>
          <Text style={styles.content}>업데이트 내역</Text>
        </View>
      </View>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>계정</Text>
        <View style={styles.contentView}>
          <Text style={styles.content}>로그아웃</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    gap: 20,
    backgroundColor: "#E0E0E0",
  },
  settingMenuView: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
  },
  contentView: {
    gap: 10,
    paddingStart: 10,
  },
  content: {
    textAlign: "right",
  },
});

export default SettingTab;
