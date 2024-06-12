import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import auth from '@react-native-firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../../constants/colors';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const AddEventTab = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
  });
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const user = auth().currentUser;
  const date = useLocalSearchParams().date;
  
  const handleAddEvent = async () => {
    if (form.title === '') {
        Alert.alert('Please give your event a title');
        return null;
    };

    await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('events')
      .add({
        title: form.title,
        startTime: firestore.Timestamp.fromDate(startTime),
        endTime: firestore.Timestamp.fromDate(endTime),
        description: form.description,
        date,
      })
      .catch(error => {
        Alert.alert(error.nativeErrorMessage);
      });

    router.back();
  };

  const onChangeStartTime = (event, selectedDate) => {
    const currentDate = selectedDate || startTime;
    setShowStartTimePicker(false);
    setStartTime(currentDate);
  };

  const onChangeEndTime = (event, selectedDate) => {
    const currentDate = selectedDate || endTime;
    setShowEndTimePicker(false);
    setEndTime(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.bg1, colors.bg2]}
        style={styles.container}
      >
        <ScrollView>
        <View style={styles.content}>
          <FormField
            title='Title'
            value={form.title}
            placeholder='Enter event title'
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles={{ marginBottom: 12, marginTop: '30%' }}
          />
          <Text style={styles.label}>
            Start Time
          </Text>
          <CustomButton
            title={startTime.toLocaleTimeString()}
            onPress={() => setShowStartTimePicker(true)}
            containerStyles={[styles.button, { backgroundColor: colors.bgDays, marginBottom: 24 }]}
            textStyles={styles.buttonText}
          />
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode='time'
              display='default'
              onChange={onChangeStartTime}
            />
          )}
          <Text style={styles.label}>End Time</Text>
          <CustomButton
            title={endTime.toLocaleTimeString()}
            onPress={() => setShowEndTimePicker(true)}
            containerStyles={[styles.button, { backgroundColor: colors.bgDays }]}
            textStyles={styles.buttonText}
          />
          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode='time'
              display='default'
              onChange={onChangeEndTime}
            />
          )}
          <FormField
            title='Description'
            value={form.description}
            placeholder='Enter event description'
            handleChangeText={(e) => setForm({ ...form, description: e })}
            otherStyles={{ marginBottom: 12, marginTop: 12 }}
          />
          <CustomButton
            title='Add Event'
            onPress={handleAddEvent}
            containerStyles={[styles.button, { backgroundColor: colors.bgDays }]}
            textStyles={styles.buttonText}
          />
        </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AddEventTab;

const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    content: {
      height: '100%',
      flex: 1,
      margin: 20,
      justifyContent: 'center',
    },
    label: {
      fontSize: 18,
      marginBottom: 5,
      color: colors.textSecondary,
      fontFamily: 'Poppins-Medium',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
    },
    button: {
        paddingVertical: 5,
        width: '95%',
        marginTop: 15,
        marginBottom: 8,
    },
    buttonText: {
      color: colors.primary,
      fontSize: 16,
    },
  });