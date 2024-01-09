import React from 'react';
import { Modal, Text, View, StyleSheet, ScrollView } from 'react-native';

const UpdateModal = ({ visible, onClose }: any) => {
  // Mock update data - replace with real data as needed
  const updates = [
    {
      version: '2.0.0',
      date: '2024-01-10',
      details: 'Version 2.0.0 is here! This is a major update.',
    },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalView}>
        <Text style={styles.title}>업데이트 내역</Text>
        <ScrollView style={styles.scrollView}>
          {updates.map((update, index) => (
            <View key={index} style={styles.updateItem}>
              <Text style={styles.version}>Version {update.version}</Text>
              <Text style={styles.date}>{update.date}</Text>
              <Text>{update.details}</Text>
            </View>
          ))}
        </ScrollView>
        <Text onPress={onClose} style={styles.closeButton}>
          닫기
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '35%',
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  scrollView: {
    width: '100%',
  },
  updateItem: {
    marginBottom: 15,
  },
  version: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
  },
  closeButton: {
    color: 'blue',
    marginTop: 20,
  },
});

export default UpdateModal;
