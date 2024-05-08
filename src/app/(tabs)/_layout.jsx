import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='home'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  )
}

export default TabsLayout