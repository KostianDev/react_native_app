import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { useGlobalContext } from '../app/context/GlobalProvider';

const Loader = () => {
  const { initializing } = useGlobalContext();

  if (!initializing) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={initializing}
        color='#fff'
        size={50}
      />
      <StatusBar backgroundColor='#020F2F' style='light'/>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 10,
  },
});