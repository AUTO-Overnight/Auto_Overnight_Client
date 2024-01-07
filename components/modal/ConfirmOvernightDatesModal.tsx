import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  Button,
} from "react-native";
import { useUserStore } from "../../store/login";

type ConfirmOvernightDatesModalProps = {
  selectedDates: string[];
  isModalVisible: boolean;
  closeModal: () => void;
};

const ConfirmOvernightDatesModal = ({
  selectedDates,
  isModalVisible,
  closeModal,
}: ConfirmOvernightDatesModalProps) => {
  const convertDateFormat = (date: string) => {
    return date.replace(/-/g, "");
  };

  const isWeekend = (date: string) => {
    const dayOfWeek = new Date(date).getDay();
    // 여기서 0은 일요일, 6은 토요일입니다.
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const confirmDates = () => {
    const dateList = selectedDates.map(convertDateFormat);
    const isWeekendList = selectedDates.map(isWeekend);

    const cookies = useUserStore.getState().cookies;

    const dataToSend = {
      date_list: dateList,
      is_weekend: isWeekendList.map(Number),
      outStayApply: convertDateFormat(selectedDates[0]),
      cookies: cookies,
    };

    console.log({ "신청 완료": dataToSend });
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>해당 날짜에 신청하시겠습니까?</Text>
          <ScrollView>
            {selectedDates.map((date) => (
              <Text key={date} style={styles.dateText}>
                {date}
              </Text>
            ))}
          </ScrollView>
          <View style={styles.buttonView}>
            {/* TODO: 여기에 외박신청 API 연결 */}
            <Button title='신청하기' onPress={confirmDates} />
            <Button title='닫기' onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmOvernightDatesModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    opacity: 0.5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "50%",
    top: "25%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  dateText: {
    backgroundColor: "orange",
    marginHorizontal: 5,
    marginBottom: 10,
  },
  buttonView: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
