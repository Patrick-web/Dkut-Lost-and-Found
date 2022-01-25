
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LostItem } from "../types";


const ClaimedCard = ({ item, onPress }: { item: LostItem, onPress: any }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: item.onlineImage }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/images/box.png')} style={{ width: 15, height: 15, marginRight: 5 }} />
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.title}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/images/location.png')} style={{ width: 15, height: 15, marginRight: 5 }} />
          <Text style={{ fontWeight: '300', }}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
    margin: 10,
    elevation: 5,
  },
  image: {
    width: "100%",
    borderRadius: 20,
    height: 200,
    marginBottom: 7,
  }
})

export default ClaimedCard;
