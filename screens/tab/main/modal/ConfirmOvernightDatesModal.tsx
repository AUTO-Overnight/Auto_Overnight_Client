import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  Button,
} from "react-native";
import { submitOvernightApplication } from "../api/overnightApplication";
import { useUserStore } from "../../../../store/login";

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
  const confirmDates = async () => {
    try {
      const userStore = useUserStore.getState(); // Zustand 스토어의 상태를 가져
      const appResponse = await submitOvernightApplication(
        selectedDates,
        userStore.cookies
      ); // cookies를 인자로 전달

      useUserStore.setState({ outStayFrDt: appResponse.outStayFrDt });
      useUserStore.setState({ outStayToDt: appResponse.outStayToDt });
      useUserStore.setState({ outStayStGbn: appResponse.outStayStGbn });

      console.log("appResponse: ", useUserStore.getState());
      closeModal();
    } catch (e) {
      console.error(`외박 신청 실패: ${e}`);
    }
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
