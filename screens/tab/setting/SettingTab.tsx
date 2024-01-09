import { StyleSheet, View, Text, ScrollView, Linking } from 'react-native';
import { SCREEN_WIDTH } from '../../../constants/style';
import { ICON_COLOR, ICON_NAME } from '../../../constants/icon';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/navigationTypes';
import { resetStore, useUserStore } from '../../../store/login';
import { Avatar, List } from 'react-native-paper';
import UpdateModal from './modal/UpdateModal';
import { useState } from 'react';

// 타입 정의
type NavigationType = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

const SettingTab = () => {
  const navigation = useNavigation<NavigationType>();
  const userStore = useUserStore.getState();

  // 전화 연결
  const callDomitoryOne = () => {
    Linking.openURL('tel:03180411030');
  };

  const callDomitoryTwo = () => {
    Linking.openURL('tel:03180411020');
  };

  // 설문조사 링크
  const goToSurvey = () => {
    Linking.openURL(
      'https://the-form.io/forms/survey/response/10ea54f7-8e79-4efa-8593-d150ffdce4ec',
    );
  };

  // 카카오톡 오픈 채팅 링크
  const openKakaoTalk = () => {
    Linking.openURL('https://open.kakao.com/o/sA4uughd');
  };

  // 셔틀 시간표 보기 링크
  const openBusTimetable = () => {
    Linking.openURL('https://ibook.kpu.ac.kr/Viewer/bus01');
  };

  // 로그아웃 함수
  const logout = () => {
    // TODO: 로그아웃 로직

    resetStore();

    // 로그아웃 후 네비게이션 스택 리셋 및 LoginScreen으로 이동
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      }),
    );
  };

  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  // 업데이트 내역 확인 함수
  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
  };

  const hideUpdateModal = () => {
    setIsUpdateModalVisible(false);
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.backgroundContainer}
    >
      <View style={styles.settingMenuView}>
        <View style={styles.userView}>
          <Avatar.Icon
            size={24}
            icon={ICON_NAME.user}
            color={'white'}
            style={styles.avatarIcon}
          />
          <Text style={styles.userText}>
            <Text style={{ fontWeight: 'bold' }}>{userStore.name}</Text>님, 좋은
            하루되세요 ☀️
          </Text>
        </View>
      </View>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>기숙사 전화 연결</Text>
        <List.Section style={styles.listContent}>
          <List.Item
            title="제 1 기숙사"
            onPress={callDomitoryOne}
            left={() => (
              <List.Icon
                icon={ICON_NAME.phone}
                color={ICON_COLOR.settingPrimary}
              />
            )}
          />
          <List.Item
            title="제 2 기숙사"
            onPress={callDomitoryTwo}
            left={() => (
              <List.Icon
                icon={ICON_NAME.phone}
                color={ICON_COLOR.settingPrimary}
              />
            )}
          />
        </List.Section>
      </View>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>문의하기</Text>
        <List.Section style={styles.listContent}>
          <List.Item
            title="설문조사"
            onPress={goToSurvey}
            left={() => (
              <List.Icon icon={ICON_NAME.survey} color={ICON_COLOR.survey} />
            )}
          />
          <List.Item
            title="카카오톡"
            onPress={openKakaoTalk}
            left={() => (
              <List.Icon icon={ICON_NAME.kakao} color={ICON_COLOR.kakao} />
            )}
          />
        </List.Section>
      </View>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>ETC</Text>
        <List.Section style={styles.listContent}>
          <List.Item
            title="셔틀버스 시간표 보기"
            onPress={openBusTimetable}
            left={() => (
              <List.Icon icon={ICON_NAME.shuttle} color={ICON_COLOR.shuttle} />
            )}
          />

          <List.Item
            title="업데이트 내역"
            onPress={showUpdateModal}
            left={() => (
              <List.Icon
                icon={ICON_NAME.update}
                color={ICON_COLOR.settingPrimary}
              />
            )}
          />
        </List.Section>
      </View>
      <View style={styles.settingMenuView}>
        <Text style={styles.title}>계정</Text>
        <List.Section style={styles.listContent}>
          <List.Item
            title="로그아웃"
            onPress={logout}
            left={() => (
              <List.Icon
                icon={ICON_NAME.logout}
                color={ICON_COLOR.settingPrimary}
              />
            )}
          />
        </List.Section>
      </View>
      <UpdateModal visible={isUpdateModalVisible} onClose={hideUpdateModal} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: '#fff', // 밝은 배경
  },
  container: {
    width: SCREEN_WIDTH,
    padding: 20, // 전체 패딩 적용
    backgroundColor: '#F0F0F0', // 라이트 그레이 배경
  },
  settingMenuView: {
    backgroundColor: '#fff',
    padding: 15, // 상하좌우 패딩
    marginBottom: 20, // 메뉴 간 간격
    borderRadius: 10, // 모서리 둥글게
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarIcon: {
    backgroundColor: '#959595',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15, // 제목 아래 간격
  },
  contentView: {
    paddingLeft: 5, // 좌측 패딩
  },
  userView: {
    paddingLeft: 5, // 좌측 패딩
    flexDirection: 'row', // 아이콘과 텍스트를 나란히
  },
  userText: {
    fontSize: 16, // 적절한 텍스트 크기
    marginTop: 2,
    marginLeft: 10, // 아이콘과 텍스트 간 간격
  },
  content: {
    flexDirection: 'row', // 아이콘과 텍스트를 나란히
    alignItems: 'center', // 세로 중앙 정렬
    marginBottom: 10, // 내용물 간 간격
  },
  contentIcon: {
    marginRight: 10, // 아이콘과 텍스트 간 간격
  },
  listContent: {
    margin: 5,
    marginVertical: -10,
  },
});

export default SettingTab;
