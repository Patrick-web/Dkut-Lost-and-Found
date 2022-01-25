import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

const LoadingIndicator = () => (
  <Modal visible={true} transparent={true}>
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#FF9387" />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default LoadingIndicator;
