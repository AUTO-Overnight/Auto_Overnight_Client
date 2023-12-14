import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SCREEN_WIDTH } from "../../constants/style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ICON_COLOR, ICON_NAME } from "../../constants/icon";

const SettingTab = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>기숙사 전화 연결</Text>
        <View style={styles.contentView}>
          <Text style={styles.content}>
            <MaterialCommunityIcons
              name={ICON_NAME.phone}
              color={ICON_COLOR.lightMode}
              size={30}
              style={styles.contentIcon}
            />
            <Text> 제 1 기숙사</Text>
          </Text>
          <Text style={styles.content}>
            <MaterialCommunityIcons
              name={ICON_NAME.phone}
              color={ICON_COLOR.lightMode}
              size={30}
              style={styles.contentIcon}
            />
            <Text> 제 2 기숙사</Text>
          </Text>
        </View>
      </View>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>문의하기</Text>
        <View style={styles.contentView}>
          <Text style={styles.content}>설문조사</Text>
          <Text style={styles.content}>카카오톡</Text>
        </View>
      </View>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>ETC</Text>
        <View style={styles.contentView}>
          <Text style={styles.content}>
            <MaterialCommunityIcons
              name={ICON_NAME.shuttle}
              color={ICON_COLOR.lightMode}
              size={30}
              style={styles.contentIcon}
            />
            <Text>셔틀 시간표 보기</Text>
          </Text>
          <Text style={styles.content}>
            <MaterialCommunityIcons
              name={ICON_NAME.update}
              color={ICON_COLOR.lightMode}
              size={30}
              style={styles.contentIcon}
            />
            <Text style={styles.contentText}> 업데이트 내역</Text>
          </Text>
        </View>
      </View>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>계정</Text>
        <View style={styles.contentView}>
          <Text style={styles.content}>
            <MaterialCommunityIcons
              name={ICON_NAME.logout}
              color={ICON_COLOR.lightMode}
              size={30}
              style={styles.contentIcon}
            />
            <Text> 로그아웃</Text>
          </Text>
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
  },
  contentView: {
    gap: 15,
    paddingStart: 10,
  },
  content: {},
  contentIcon: {},
  contentText: {},
});

export default SettingTab;
