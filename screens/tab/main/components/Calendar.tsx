import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

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
    />
  </View>
);

export default CalendarView;

const styles = StyleSheet.create({
  view: {
    flex: 6,
  },
});
