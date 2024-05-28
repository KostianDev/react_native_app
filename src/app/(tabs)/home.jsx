import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FAB } from 'react-native-paper';
import { router, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { startOfMonth, endOfMonth, format } from 'date-fns';

import { colors } from '../../constants/colors';
import icons from '../../constants/icons';

const HomeTab = () => {
  const [events, setEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState(format(new Date(), 'yyyy-MM'));
  const user = auth().currentUser;

  const fetchEventsForMonth = useCallback(async (month) => {
    const startDate = startOfMonth(new Date(month));
    const endDate = endOfMonth(new Date(month));

    const eventsSnapshot = await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('events')
      .where('date', '>=', format(startDate, 'yyyy-MM-dd'))
      .where('date', '<=', format(endDate, 'yyyy-MM-dd'))
      .get();

    const fetchedEvents = eventsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        startTime: data.startTime.toDate(),
        endTime: data.endTime.toDate(),
      };
    });

    const datesWithEvents = fetchedEvents.reduce((acc, event) => {
      acc[event.date] = { marked: true };
      return acc;
    }, {});

    if (selectedDate in datesWithEvents) {
      datesWithEvents[selectedDate] = { ...datesWithEvents[selectedDate], selected: true };
    } else {
      datesWithEvents[selectedDate] = { selected: true };
    }

    setMarkedDates(datesWithEvents);
    setEvents(fetchedEvents.filter(event => event.date === selectedDate));
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      fetchEventsForMonth(currentMonth);
    }, [currentMonth])
  );

  useEffect(() => {
    fetchEventsForMonth(currentMonth);
  }, [currentMonth, fetchEventsForMonth]);

  const handleMonthChange = (month) => {
    setCurrentMonth(month.dateString.substring(0, 7));
  };

  const handleDayPress = (day) => {
    const newMarkedDates = { ...markedDates };
    Object.keys(newMarkedDates).forEach(date => {
      if (newMarkedDates[date].selected) {
        delete newMarkedDates[date].selected;
      }
    });

    setSelectedDate(day.dateString);
    if (newMarkedDates[day.dateString]) {
      newMarkedDates[day.dateString] = { ...newMarkedDates[day.dateString], selected: true };
    } else {
      newMarkedDates[day.dateString] = { selected: true };
    }

    setMarkedDates(newMarkedDates);
    setEvents(events.filter(event => event.date === day.dateString));
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        router.replace('/sign-in');
      });
  };

  return (
    <LinearGradient 
        colors={[colors.bg1, colors.bg2]}
        style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{ ...markedDates }}
          onMonthChange={handleMonthChange}
          hideExtraDays
          theme={styles.theme}
          style={styles.calendar}
        />
        <View style={styles.timeline}>
          <Text style={styles.dateTitle}>
            Events on {selectedDate}
          </Text>
          <FlatList
            data={events}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventItem}>
                <Text style={styles.eventTitle}>
                  {item.title}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.eventText}>
                  {item.startTime.toLocaleTimeString()} - {item.endTime.toLocaleTimeString()}
                </Text>
                <TouchableOpacity onPress={async () => {
                  await firestore()
                    .collection('users')
                    .doc(user.uid)
                    .collection('events')
                    .doc(item.id)
                    .delete();
                  await fetchEventsForMonth(currentMonth);
                  }}
                >
                  <Image
                    source={icons.trashCan}
                    style={styles.delete}
                  />
                </TouchableOpacity>
                </View>
                <Text style={styles.eventText}>
                  {item.description}
                </Text>
              </View>
            )}
          />
        </View>
        <FAB
          style={styles.fab}
          size='small'
          icon='plus'
          onPress={() => router.push({ pathname: '/add-event', params: {date: selectedDate} })}
        />
        <TouchableOpacity
         style={styles.iconContainer}
          onPress={handleLogout}
        >
          <Image
            source={icons.logout}
            style={styles.logout}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    flex: 1,
  },
  timeline: {
    flex: 1,
    marginTop: 20,
  },
  dateTitle: {
    fontSize: 24,
    marginBottom: 10,
    color: colors.text,
    fontFamily: 'Poppins-Bold',
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.placeholder,
  },
  eventTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: colors.textSecondary,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    backgroundColor: colors.secondary2,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  logout: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: colors.bg1,
  },
  eventText: {
    fontSize: 18,
    color: colors.textSecondary,
    fontFamily: 'Poppins-Regular',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 15,
    padding: 5,
    backgroundColor: colors.secondary2,
    borderRadius: 10,
    zIndex: 1,
  },
  theme: {
    calendarBackground: colors.calendarBg,
    textSectionTitleColor: colors.monthDays,
    selectedDayBackgroundColor: colors.selectedDayBg,
    selectedDayTextColor: colors.selectedDay,
    todayTextColor: colors.secondary2,
    dayTextColor: colors.days,
    textDisabledColor: colors.placeholder,
    dotColor: colors.secondary2,
    selectedDotColor: colors.secondary2,
    arrowColor: colors.text,
    monthTextColor: colors.monthTitle,
    textDayFontFamily: 'Poppins-Semibold',
    textMonthFontFamily: 'Poppins-Semibold',
    textDayHeaderFontFamily: 'Poppins-Bold',
    textDayFontSize: 13,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 13,
  },
  calendar: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    paddingBottom: 10,
  },
  delete: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.textSecondary,
    marginRight: 10,
  },
});