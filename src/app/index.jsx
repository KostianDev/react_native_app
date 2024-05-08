import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import { router } from 'expo-router';
import React from 'react';

import CustomButton from '../components/CustomButton';

import { colors } from '../constants/colors';
import icons from '../constants/icons';

const WelcomePage = () => {
  return (
    <SafeAreaView style={ styles.container }>

      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View style={ styles.content }>
          <Image
            source={ icons.logo }
            style={ styles.logo }
          />
          <Text style={ styles.text }>
            Welcome to Kalendar
          </Text>
          <CustomButton
            title="Continue with Email"
            onPress={() => router.push('../sign-in')}
            containerStyles={[ styles.button, { backgroundColor: colors.secondary1 }]}
            textStyles={ styles.buttonText }
          />
          <CustomButton
            title="Continue as a Guest"
            onPress={() => router.push('../home')}
            containerStyles={[ styles.button, { backgroundColor: colors.secondary2 }]}
            textStyles={ styles.buttonText }
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#020404" style="light" />
    </SafeAreaView>
  )
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: '100%',
  },
  text: {
    color: colors.text,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 13,
  },
  content: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:  4,
    marginBottom: 48,
  },
  logo: {
    maxWidth: '25%',
    height: '25%',
    resizeMode: 'contain',
    tintColor: colors.secondary1,
    marginBottom: 20,
  },
  statusbar: {
    backgroundColor: colors.primary,
    color: 'white',
  },
  button: {
    paddingVertical: 10,
    width: "75%",
    marginTop: 7,
    marginBottom: 8,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
  },
});