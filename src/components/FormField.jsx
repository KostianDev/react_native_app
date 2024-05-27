import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import React from 'react';

import { colors } from '../constants/colors';
import icons from '../constants/icons';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  isPassword,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={otherStyles}>
      <Text style={styles.title}>
        {title}
      </Text>
      <View style={styles.formField}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          { ...props }
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.view : icons.hide}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  title: {
    color: colors.textSecondary,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
    marginLeft: 3,
},
  formField: {
    width: '95%',
    backgroundColor: colors.formField,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderWidth: 2,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  icon: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
    marginRight: 6,
    tintColor: colors.placeholder,
  },
});