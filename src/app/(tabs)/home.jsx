import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { colors } from '../../constants/colors'

const HomeTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeTab</Text>
    </View>
  )
}

export default HomeTab

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