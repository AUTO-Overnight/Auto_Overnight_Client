import { StyleSheet, View, Text, ScrollView, Linking } from "react-native";
import { SCREEN_WIDTH } from "../../constants/style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ICON_COLOR, ICON_NAME } from "../../constants/icon";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { resetStore, useUserStore } from "../../store/login";

// 타입 정의
type NavigationType = StackNavigationProp<RootStackParamList, "LoginScreen">;

const SettingTab = () => {
  const navigation = useNavigation<NavigationType>();
  const userStore = useUserStore.getState();

  // 전화 연결
  const callDomitoryOne = () => {
    Linking.openURL("tel:03180411030");
  };

  const callDomitoryTwo = () => {
    Linking.openURL("tel:03180411020");
  };

  // 설문조사 링크
  const goToSurvey = () => {
    Linking.openURL(
      "https://the-form.io/forms/survey/response/10ea54f7-8e79-4efa-8593-d150ffdce4ec"
    );
  };

  // 카카오톡 오픈 채팅 링크
  const openKakaoTalk = () => {
    Linking.openURL("https://open.kakao.com/o/sA4uughd");
  };

  // 셔틀 시간표 보기 링크
  const openBusTimetable = () => {
    Linking.openURL("https://ibook.kpu.ac.kr/Viewer/bus01");
  };

  // 업데이트 내역 확인 함수
  const checkUpdates = () => {
    // TODO: 업데이트 내역 확인 로직
  };

  // 로그아웃 함수
  const logout = () => {
    // TODO: 로그아웃 로직

    resetStore();

    // 로그아웃 후 네비게이션 스택 리셋 및 LoginScreen으로 이동
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      })
    );
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.backgroundContainer}>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>기숙사 전화 연결</Text>
        <View style={styles.contentView}>
          {/* 전화 연결 */}
          <Text style={styles.content} onPress={callDomitoryOne}>
            <MaterialCommunityIcons
              name={ICON_NAME.phone}
              color={ICON_COLOR.lightMode}
              size={30}
              style={styles.contentIcon}
            />
            <Text> 제 1 기숙사</Text>
          </Text>
          {/* 전화 연결 */}
          <Text style={styles.content} onPress={callDomitoryTwo}>
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
          <Text style={styles.content} onPress={goToSurvey}>
            <MaterialCommunityIcons
              name='format-list-bulleted'
              color={ICON_COLOR.lightMode}
              size={30}
              style={styles.contentIcon}
            />
            설문조사
          </Text>
          <Text style={styles.content} onPress={openKakaoTalk}>
            <MaterialCommunityIcons
              name='message-text'
              color={ICON_COLOR.lightMode}
              size={30}
              style={styles.contentIcon}
            />
            카카오톡
          </Text>
        </View>
      </View>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>ETC</Text>
        <View style={styles.contentView}>
          {/* 셔틀 시간표 */}
          <Text style={styles.content} onPress={openBusTimetable}>
            <MaterialCommunityIcons
              name={ICON_NAME.shuttle}
              color={ICON_COLOR.lightMode}
              size={30}
              style={styles.contentIcon}
            />
            <Text>셔틀 시간표 보기</Text>
          </Text>
          {/* 업데이트 보기 */}
          <Text style={styles.content} onPress={checkUpdates}>
            <MaterialCommunityIcons
              name={ICON_NAME.update}
              color={ICON_COLOR.lightMode}
              size={30}
              style={styles.contentIcon}
            />
            <Text style={styles.contentText}>업데이트 내역</Text>
          </Text>
        </View>
      </View>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>계정</Text>
        <View style={styles.contentView}>
          <Text style={styles.content} onPress={logout}>
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
  backgroundContainer: {
    backgroundColor: "#fff", // 밝은 배경
  },
  container: {
    width: SCREEN_WIDTH,
    padding: 20, // 전체 패딩 적용
    backgroundColor: "#F0F0F0", // 라이트 그레이 배경
  },
  settingMenuView: {
    backgroundColor: "#fff",
    padding: 15, // 상하좌우 패딩
    marginBottom: 20, // 메뉴 간 간격
    borderRadius: 10, // 모서리 둥글게
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15, // 제목 아래 간격
  },
  contentView: {
    paddingLeft: 5, // 좌측 패딩
  },
  content: {
    flexDirection: "row", // 아이콘과 텍스트를 나란히
    alignItems: "center", // 세로 중앙 정렬
    marginBottom: 10, // 내용물 간 간격
  },
  contentIcon: {
    marginRight: 10, // 아이콘과 텍스트 간 간격
  },
  contentText: {
    fontSize: 16, // 적절한 텍스트 크기
  },
});

export default SettingTab;
