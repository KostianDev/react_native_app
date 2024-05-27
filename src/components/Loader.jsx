import { View, ActivityIndicator, Dimensions, StyleSheet } from "react-native";

const Loader = ({ initializing }) => {
  const screenHeight = Dimensions.get("screen").height;

  if (!initializing) return null;

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      <ActivityIndicator
        animating={initializing}
        color="#fff"
        size={50}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 10,
    },
    });