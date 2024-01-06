import { useEffect, useState } from "react";
import { DataTable, Text } from "react-native-paper";
import { SafeAreaView, StyleSheet, TextStyle, View } from "react-native";
import { bonus_dummy } from "../assets/bonus_dummy";
import { SCREEN_WIDTH } from "../constants/style";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { useUserStore } from "../store/login";
import { getBonusPoint } from "../src/bonusPoint/api/bonusPoint";
import { BonusPoint } from "../src/bonusPoint/interface/bonusPoint";

// bonusPointData의 initialData 형식
const bonusDataInitialData = {
  cmpScr: [],
  lifSstArdGbn: [],
  ardInptDt: [],
  lifSstArdCtnt: [],
};

const BonusPointScreen = () => {
  // BonusPoint 데이터를 저장하는 state
  const [bonusPointData, setBonusPointData] =
    useState<BonusPoint>(bonusDataInitialData);

  // 상벌점 데이터를 받아와서 저장하는 함수
  const getBonusData = async () => {
    try {
      // useUserStore에서 name, cookies, year, semesterDivision을 가져오기
      const { name, cookies, yy, tmGbn } = useUserStore.getState();

      // 상벌점 데이터를 받아오기
      const response = await getBonusPoint({
        name,
        cookies,
        yy,
        tmGbn,
      });

      setBonusPointData(response.data);
      console.log("[BonusPoint] response: ", response.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    // getBonusData();
  }, []);

  // 벌점일 때 빨간색으로 바꿔주는 함수
  const getCellStyle = (lifSstArdGbn: number): TextStyle => {
    return lifSstArdGbn === 2 ? styles.penalty_color : styles.reward_color;
  };

  // 상벌점 총점을 계산하는 함수
  function getTotalScore() {
    let totalScore = 0;

    bonus_dummy.cmpScr.forEach(score => {
      totalScore += Number(score);
    });

    return totalScore;
  }

  // lifSstArdGbn이 1이면 상점, 2이면 벌점으로 바꿔주는 함수
  function getDivision(lifSstArdGbn: number) {
    return lifSstArdGbn === 1 ? "상점" : "벌점";
  }

  // changeFormatDate에서 일자가 1자리일 때 0을 붙여주는 함수
  function addZero(num: number) {
    return num < 10 ? `0${num}` : num;
  }

  // 일자를 YYYY-MM-DD 형식으로 바꿔주는 함수
  function changeFormatDate(date: number) {
    const year = Math.floor(date / 10000);
    const month = addZero(Math.floor((date % 10000) / 100));
    const day = addZero(Math.floor(date % 100));

    return `${year}-${month}-${day}`;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text>상벌점 총점</Text>
            <Text style={styles.totalScoreView}>{getTotalScore()}</Text>
          </View>

          <View style={styles.bonusView}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>상/벌 구분</DataTable.Title>
                <DataTable.Title>점수</DataTable.Title>
                <DataTable.Title>상벌내용</DataTable.Title>
                <DataTable.Title>일자</DataTable.Title>
              </DataTable.Header>

              {/* 배포에서는 bonus_dummy 대신 bonusPointData.cmpScr로 쓰기 */}
              {bonus_dummy.cmpScr.map((item, index) => (
                <DataTable.Row
                  key={index}
                  style={getCellStyle(Number(bonus_dummy.lifSstArdGbn))}
                >
                  <DataTable.Cell>
                    {getDivision(Number(bonus_dummy.lifSstArdGbn[index]))}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {Number(bonus_dummy.cmpScr[index])}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {bonus_dummy.lifSstArdCtnt[index]}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableText}>
                    {changeFormatDate(Number(bonus_dummy.ardInptDt[index]))}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default BonusPointScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },
  header: {
    width: SCREEN_WIDTH,
    height: 150,
    backgroundColor: "#f6f8ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  totalScoreView: {
    fontSize: 40,
  },
  bonusView: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  tableText: {
    justifyContent: "center",
  },
  reward_color: {
    color: "black",
  },
  penalty_color: {
    // color: '#fff5f5'
    backgroundColor: "#fff5f5",
  },
});
