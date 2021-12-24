
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ClaimedCard = (props: any) => {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.card}>
        <Image style={styles.image} source={props.image} />
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.title}</Text>
        <Text style={{ fontWeight: '300', }}>
          Claimed on {props.claimDate || 'claimed date'}
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
    height: 200,
    borderRadius: 20,
    marginBottom: 7,
  }
})

export default ClaimedCard;
