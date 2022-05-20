import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { LostItem } from "../types";

const LostCard = ({ item, onPress }: { item: LostItem, onPress: any }) => {
  return (
    <Pressable onPress={onPress} >
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: item.onlineImage }} />
        <View style={{marginTop:-80,marginLeft:10}}>
          <View style={styles.cardInfo}>
            <Image source={require('../assets/images/box.png')} style={{ width: 15, height: 15, marginRight: 5 }} />
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.title}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Image source={require('../assets/images/location.png')} style={{ width: 15, height: 15, marginRight: 5 }} />
            <Text style={{ fontWeight: '300', }}>{item.location}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 15,
  },
  cardInfo:{
    backgroundColor:'white',
    alignSelf:'flex-start',
    paddingVertical:5,
    paddingHorizontal:10,
    borderRadius: 20,
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom:5,
    width:'auto',
  },
  image: {
    width: "100%",
    borderRadius: 20,
    height: 200,
    marginBottom: 7,
  }
})

export default LostCard;
