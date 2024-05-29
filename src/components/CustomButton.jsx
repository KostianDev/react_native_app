import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({
    title,
    onPress,
    containerStyles,
    textStyles,
}) => {
  return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[styles.container, containerStyles]}
      >
        <Text style={[styles.text, textStyles]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
    },
});