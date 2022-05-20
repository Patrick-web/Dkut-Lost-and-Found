
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Button from "./Button";

const UploadedItemCard = (props: any) => {
  return (
    <Pressable>
      <View style={styles.card}>
        <View style={styles.indicatorIcon}>
          {!props.item.isClaimed && <Image style={{ width: 20, height: 20, }} source={require('../assets/images/stillMissing.png')} />}
          {props.item.isClaimed && <Image style={{ width: 20, height: 20, }} source={require('../assets/images/found.png')} />}
        </View>
        <Image style={styles.image} source={{ uri: props.item.onlineImage }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/images/box.png')} style={{ width: 15, height: 15, marginRight: 5 }} />
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.item.title}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/images/location.png')} style={{ width: 15, height: 15, marginRight: 5 }} />
          <Text style={{ fontWeight: '300', }}>{props.item.location}</Text>
        </View>
        <View style={styles.footer}>
          <View style={{ width: '100%' }}>
            {!props.item.isClaimed &&
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Pressable onPress={() => { props.editItem() }} >
                  <View style={[styles.roundButton, { marginRight: 10, backgroundColor: "#F6D3BC" }]} >
                    <Image style={{ width: 20, height: 20 }} source={require('../assets/images/edit.png')} />
                  </View>
                </Pressable>
                <Button isLoading={props.isLoading} text={"Mark as Returned"} textColor={"white"} color={'#71BF8C'} onPress={() => props.toggleIsReturned(true)} />
                <Pressable onPress={() => { props.deleteItem() }} >
                  <View style={[styles.roundButton, { backgroundColor: "#FFC1C1" }]} >
                    <Image style={{ width: 30, height: 30 }} source={require('../assets/images/delete.png')} />
                  </View>
                </Pressable>
              </View>
            }
            {props.item.isClaimed &&
              <View style={{ width: '100%', alignItems: 'center', padding: 10, }}>
                <Button isLoading={props.isLoading} text={"Mark as not Returned"} textColor={"white"} color={'crimson'} onPress={() => props.toggleIsReturned(false)} />
              </View>
            }
          </View>
        </View>
      </View>
    </Pressable >
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 10,
    padding: 10,
    margin: 10,
    width: "90%",
    alignSelf: 'center'
  },
  image: {
    borderRadius: 20,
    width: "100%",
    height: 200,
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
