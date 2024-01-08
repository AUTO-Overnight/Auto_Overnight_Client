import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

// TODO: 타입 정의
const CalendarView = ({
  onDayPress,
  currentDate,
  markedDates,
  onMonthChange,
}: any) => (
  <View style={styles.view}>
    <Calendar
      onDayPress={onDayPress}
      key={currentDate}
      current={currentDate}
      markedDates={markedDates}
      showSixWeeks
      enableSwipeMonths
      onMonthChange={onMonthChange}
      minDate={new Date().toISOString().split('T')[0]}
      // maxDate를 오늘 날짜로부터 45일 뒤로 설정
      maxDate={
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 45)
          .toISOString()
          .split('T')[0]
      }
    />
  </View>
);

export default CalendarView;

const styles = StyleSheet.create({
  view: {
    flex: 6,
  },
});
