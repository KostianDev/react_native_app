import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { colors } from '../../constants/colors'

const SignIn = () => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.text }>SignIn</Text>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: colors.text,
  },
})