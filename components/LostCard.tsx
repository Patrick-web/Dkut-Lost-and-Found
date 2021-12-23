import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const LostCard = () => {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.card}>
        <Image style={styles.image} source={require('../assets/images/sampleImage.png')} />
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Black Striped Umbrella</Text>
        <Text style={{ fontWeight: '300', }}>
          Found at
          Rc 18
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    shadowColor: '#898989',
    borderRadius: 20,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 7,
  }
})

export default LostCard;
