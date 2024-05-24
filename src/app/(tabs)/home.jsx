import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../../constants/colors';

const HomeTab = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.bg1, colors.bg2]}
        style={styles.container}
      >
        <TouchableOpacity onPress={() => {
          auth()
            .signOut()
            .then(() => {
              router.replace('/sign-in');
            });
          }}
        >
          <Text style={styles.text}>HomeTab</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default HomeTab;

const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    text: {
      fontSize: 30,
      color: colors.text,
    },
  })