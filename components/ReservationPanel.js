import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReservationPanel = ({ restaurant, onClose, onReserve }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [guests, setGuests] = useState(2);
  const [step, setStep] = useState(1);

  const dates = ['Today', 'Tomorrow', 'In 2 days', 'In 3 days', 'In 4 days', 'In 5 days', 'In 6 days'];
  const times = ['12:00', '13:00', '14:00', '15:00', '18:00', '19:00', '20:00', '21:00'];

  const renderDateItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.dateItem, selectedDate === item && styles.selectedItem]}
      onPress={() => setSelectedDate(item)}
    >
      <Text style={[styles.dateText, selectedDate === item && styles.selectedText]}>{item}</Text>
    </TouchableOpacity>
  );

  const renderTimeItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.timeItem, selectedTime === item && styles.selectedItem]}
      onPress={() => setSelectedTime(item)}
    >
      <Text style={[styles.timeText, selectedTime === item && styles.selectedText]}>{item}</Text>
    </TouchableOpacity>
  );

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleReserve();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReserve = () => {
    if (selectedDate && selectedTime) {
      onReserve({ date: selectedDate, time: selectedTime, guests });
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.stepTitle}>Select a date</Text>
            <FlatList
              data={dates}
              renderItem={renderDateItem}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.stepTitle}>Select a time</Text>
            <FlatList
              data={times}
              renderItem={renderTimeItem}
              keyExtractor={(item) => item}
              numColumns={4}
              scrollEnabled={false}
            />
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.stepTitle}>Number of guests</Text>
            <View style={styles.guestsContainer}>
              <TouchableOpacity onPress={() => setGuests(Math.max(1, guests - 1))}>
                <Ionicons name="remove-circle-outline" size={32} color="#f4511e" />
              </TouchableOpacity>
              <Text style={styles.guestsNumber}>{guests}</Text>
              <TouchableOpacity onPress={() => setGuests(guests + 1)}>
                <Ionicons name="add-circle-outline" size={32} color="#f4511e" />
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  const isNextDisabled = () => {
    if (step === 1) return !selectedDate;
    if (step === 2) return !selectedTime;
    return false;
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.panelContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          
          {renderStepContent()}

          <View style={styles.buttonContainer}>
            {step > 1 && (
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.nextButton, isNextDisabled() && styles.disabledButton]}
              onPress={handleNext}
              disabled={isNextDisabled()}
            >
              <Text style={styles.buttonText}>
                {step === 3 ? 'Confirm' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  panelContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  dateItem: {
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  timeItem: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#f4511e',
    borderColor: '#f4511e',
  },
  dateText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 16,
  },
  selectedText: {
    color: 'white',
  },
  guestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  guestsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
});

export default ReservationPanel;