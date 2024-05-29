import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";

import GlobalProvider from './context/GlobalProvider';
import { StatusBar } from 'react-native';

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Black': require('../../assets/fonts/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('../../assets/fonts/Poppins-BlackItalic.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('../../assets/fonts/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('../../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLight': require('../../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('../../assets/fonts/Poppins-ExtraLightItalic.ttf'),
    'Poppins-Italic': require('../../assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('../../assets/fonts/Poppins-LightItalic.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('../../assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('../../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('../../assets/fonts/Poppins-ThinItalic.ttf'),
  });

  useEffect(() => {
    if (fontError) throw fontError;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    };
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    return null;
  };

  if (!fontsLoaded && !fontError) {
    return null;
  };

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='index' options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor='#020F2F' style='light' />
    </GlobalProvider>
  );
};

export default RootLayout;