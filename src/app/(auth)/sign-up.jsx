import { ScrollView, StyleSheet, Text, View, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { router, Link } from 'expo-router';

import FormField from '../../components/FormField';

import { colors } from '../../constants/colors';
import images from '../../constants/images';
import CustomButton from '../../components/CustomButton';

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    rePassword: '',
  });

  const submit = () => {
    if (form.email === '' || form.password === '' || form.rePassword === '') {
      Alert.alert('Please fill in all fields');
      return null;
    };
    if (form.password !== form.rePassword) {
      Alert.alert('Passwords do not match');
      return null;
    };

    auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(() => {
        router.replace('/home');
      })
      .catch(error => {
        Alert.alert(error.nativeErrorMessage);
      });
  }

  return (
    <SafeAreaView style={ styles.container }>
      <LinearGradient
        colors={[ colors.bg1, colors.bg2 ]}
        style={ styles.container }
      >
        <ScrollView>
          <View style={ styles.content }>
            <Image 
              source={ images.logo }
              style={ styles.logo }
            />
            <Text style={ styles.text }>
              Sign Up
            </Text>
            <FormField
              title='Email'
              value={form.email}
              placeholder='Enter your email'
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles={{ marginBottom:12 }}
              keyboardType='email-address'
            />
            <FormField
              title='Password'
              value={form.password}
              placeholder='Enter your password'
              handleChangeText={(e) => setForm({ ...form, password: e })}
              isPassword={true}
              otherStyles={{ marginBottom:12 }}
            />
            <FormField
              title='Confirm Password'
              value={form.rePassword}
              placeholder='Enter your password again'
              handleChangeText={(e) => setForm({ ...form, rePassword: e })}
              isPassword={true}
              otherStyles={{}}
            />
            <CustomButton
              title='Sign Up'
              onPress={submit}
              containerStyles={[styles.button, { backgroundColor: colors.secondary1 }]}
              textStyles={[styles.buttonText, {}]}
            />
            <View style={styles.bottom}>
              <Text style={styles.bottomText}>
                Have an account already?
              </Text>
              <Link href={'/sign-in'} style={styles.link}>
                Sign In
              </Link>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 18,
  },
  text: {
    fontSize: 27,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    marginVertical: 20,
  },
  logo: {
    resizeMode: 'contain',
    maxWidth: 90,
    maxHeight: 90,
    marginTop: '20%',
    marginBottom: 10,
    marginLeft: -10,
  },
  button: {
    paddingVertical: 8,
    width: '95%',
    marginTop: 35,
    marginBottom: 8,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 18,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 5,
  },
  bottomText: {
    color: colors.textSecondary,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  link: {
    color: colors.secondary2,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});