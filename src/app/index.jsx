import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import auth from '@react-native-firebase/auth';

import CustomButton from '../components/CustomButton';
import { colors } from '../constants/colors';
import images from '../constants/images';
import { useGlobalContext } from './context/GlobalProvider';
import Loader from '../components/Loader';

const WelcomePage = () => {
  const { user, initializing } = useGlobalContext();

  if (!initializing && user) return <Redirect href='/home' />;

  return (
    <LinearGradient 
      colors={[ colors.bg1, colors.bg2 ]} 
      style={ styles.container }
    >
      <SafeAreaView style={ styles.container }>
        <Loader initializing={initializing} />
        <ScrollView contentContainerStyle={ styles.container }>
          <View style={ styles.content }>
            <Image
              source={ images.logo }
              style={ styles.logo }
            />
            <Text style={ styles.text }>
              Welcome to Kalendar!
            </Text>
            <CustomButton
              title='Continue with Email'
              onPress={() => router.push('../sign-in')}
              containerStyles={[ styles.button, { backgroundColor: colors.secondary1 }]}
              textStyles={ styles.buttonText }
            />
            <CustomButton
              title='Continue as a Guest'
              onPress={() => auth()
                .signInAnonymously()
                .then(() => {
                  router.push('../home');
                })
                .catch(error => {
                  Alert.alert(error.message);
                })
              }
              containerStyles={[ styles.button, { backgroundColor: colors.secondary2 }]}
              textStyles={ styles.buttonText }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  text: {
    color: colors.text,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 26,
    marginVertical: 10,
  },
  content: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:  4,
    marginBottom: 56,
  },
  logo: {
    maxWidth: '35%',
    height: '35%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    width: "75%",
    marginTop: 7,
    marginBottom: 8,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 18,
  },
});