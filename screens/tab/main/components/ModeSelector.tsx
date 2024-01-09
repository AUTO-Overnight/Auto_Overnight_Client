import { StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

// TODO: selectionMode, setSelectionMode 타입 정의
const ModeSelector = ({ selectionMode, setSelectionMode }: any) => (
  <View style={styles.modeSelector}>
    {/* TODO: 중앙 선 없이 둥글게 전환할 수 있는 지 찾아보기 */}
    <SegmentedButtons
      value={selectionMode}
      onValueChange={setSelectionMode}
      buttons={[
        {
          label: '단일 선택',
          value: 'single',
          style: {
            backgroundColor:
              selectionMode === 'single' ? '#C9DBFF' : 'transparent',
            borderColor: '#fff',
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
          },
        },
        {
          label: '다중 선택',
          value: 'multiple',
          style: {
            backgroundColor:
              selectionMode === 'multiple' ? '#C9DBFF' : 'transparent',
            borderColor: '#fff',
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
          },
        },
      ]}
      style={styles.segmentButton}
    />
  </View>
);

export default ModeSelector;

const styles = StyleSheet.create({
  modeSelector: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  segmentButton: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#DEDEDE',
    backgroundColor: 'transparent',
  },
  pressed: {
    backgroundColor: 'transparent', // 눌림 상태에서의 배경색을 투명하게 설정
  },
});
