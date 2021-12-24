
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const UploadedItemCard = (props: any) => {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.card}>
        <View style={styles.indicatorIcon}>
          <Image style={{ width: 20, height: 20, }} source={require('../assets/images/stillMissing.png')} />
        </View>
        <Image style={styles.image} source={props.image || require('../assets/images/sampleImage.png')} />
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.title || 'samplem title'}</Text>
        <Text style={{ fontWeight: '300', marginBottom: 0 }}>
          Found at {props.location || 'location'}
        </Text>
        <View style={styles.footer}>
          <View>
            <TouchableOpacity onPress={() => { }} >
              <View style={styles.smallButton} >
                <Text style={{ color: "white", fontWeight: "900" }} >Mark as Returned</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => { }} >
              <View style={[styles.roundButton, { marginRight: 10, backgroundColor: "#F6D3BC" }]} >
                <Image style={{ width: 20, height: 20 }} source={require('../assets/images/edit.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} >
              <View style={[styles.roundButton, { backgroundColor: "#FFC1C1" }]} >
                <Image style={{ width: 30, height: 30 }} source={require('../assets/images/delete.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    shadowColor: '#898989',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    width: "90%",
    alignSelf: 'center'
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginBottom: 7,
  },
  indicatorIcon: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#898989',
    right: -10,
    top: -10,
  },
  footer: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    width: "100%",
    // paddingLeft: 10,
    // paddingRight: 0,
    transform: [{ translateY: 5 }],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  smallButton: {
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#71BF8C',
  },
  roundButton: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    borderRadius: 30,
    padding: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  }
})

export default UploadedItemCard;
