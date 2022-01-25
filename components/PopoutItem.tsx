import { View, Modal, Image, Text, StyleSheet, TouchableOpacity, Linking, Pressable } from 'react-native'
import Button from './Button'

const PopoutItem = (props: any) => {
  function callFinder() {
    Linking.openURL(`tel:${props.item.finderNumber}`)
    props.setShowModal(false)
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}>

      <View style={styles.container}>
        <Pressable
          onPress={() => { props.setShowModal(false) }}
        >
          <View style={styles.closeModal}>
            <Image style={{ width: 20, height: 20 }} source={require('../assets/images/close.png')} />
          </View>
        </Pressable>

        <View style={styles.card}>
          <Image source={require('../assets/images/shadow.png')} style={{ position: 'absolute', top: -20, left: 0, width: '100%', }} />
          <View style={{ width: '100%', height: 200, }}>
            <Image style={{ width: "100%", height: "100%", }} source={{ uri: props.item.onlineImage }} />
          </View>
          <View style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../assets/images/box.png')} style={{ width: 15, height: 15, marginRight: 5 }} />
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.item.title}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../assets/images/location.png')} style={{ width: 15, height: 15, marginRight: 5 }} />
              <Text style={{ fontWeight: '300', }}>{props.item.location}</Text>
            </View>
            <View style={styles.warning}>
              <Image style={{ width: 40, height: 40, marginRight: 15 }} source={require('../assets/images/warning.png')} />
              <Text style={{ width: "80%", color: "#FFB800", fontWeight: "bold" }}>You will need to provide further details of the item to confirm to the finder that you are the actual owner</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 10 }}>
              <Button text={'Call Finder'} color={"#FF9387"} width={'50%'} onPress={callFinder} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    elevation: 40,
    alignSelf: 'center',
    width: "100%",
    backgroundColor: "white",
  },
  warning: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "rgba(255,214,107,0.33)",
    borderRadius: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: 'center',
  },
  primaryButton: {
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: "#FF9387",
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeModal: {
    elevation: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 20,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default PopoutItem;
