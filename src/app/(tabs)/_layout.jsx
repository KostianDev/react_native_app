import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const TabsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name='home' options={{ headerShown: false }}/>
        <Stack.Screen name='add-event' options={{ headerShown: false }}/>
      </Stack>
      <StatusBar backgroundColor='#020F2F' style='light'/>
    </>
  );
};

export default TabsLayout;