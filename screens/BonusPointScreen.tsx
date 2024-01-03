import * as React from 'react';
import { DataTable, Text } from 'react-native-paper';
import { SafeAreaView, StyleSheet, TextStyle, View } from "react-native";
import { bonus_dummy } from '../assets/bonus_dummy';
import { SCREEN_WIDTH } from "../constants/style";
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

const BonusPointScreen = () => {
  const getCellStyle = (division: string): TextStyle => {
    return division === '벌점' ? styles.penalty_color : styles.reward_color;
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text>상벌점 총점</Text>
            <Text style={styles.totalScoreView}>-15</Text>
          </View>
          
          <View style={styles.bonusView}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>상/벌 구분</DataTable.Title>
                <DataTable.Title numeric>점수</DataTable.Title>
                <DataTable.Title numeric>일자</DataTable.Title>
              </DataTable.Header>

              {bonus_dummy.map((item) => (
                <DataTable.Row key={item.key} style={getCellStyle(item.division)}>
                  <DataTable.Cell>{item.division}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.score}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.date}</DataTable.Cell>
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
  },
  header: {
    width: SCREEN_WIDTH,
    height: 150,
    backgroundColor: '#EFF4FF',
    justifyContent: 'center',
    alignItems: 'center',
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
  reward_color: {
    color: 'black',
  },
  penalty_color: {
    // color: '#fff5f5'
    backgroundColor: '#fff5f5'
  },
})