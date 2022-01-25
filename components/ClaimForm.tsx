
import { View, Modal, Image, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import * as Linking from "expo-linking"

const ClaimForm = (props: any) => {

  return (
    <Modal
      animationType="slide"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", }}
      transparent={true}
      visible={props.showModal || false}>
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
          <View style={{ width: '100%', height: 200, marginBottom: 10 }}>
            <Image style={{ width: "100%", height: "100%", }} source={{ uri: props.item.onlineImage }} />
          </View>
          <View style={{ padding: 10 }}>
            <Text>{props.item.title}</Text>
            <Text>{props.item.location} </Text>
            <View style={styles.warning}>
              <Image style={{ width: 40, height: 40, marginRight: 15 }} source={require('../assets/images/warning.png')} />
              <Text style={{ width: "80%", color: "#FFB800", fontWeight: "bold" }}>Any issue regarding wrongly claimed items must be resolved with the Finder. The platform does not handle these cases.</Text>
            </View>
            <TouchableOpacity onPress={() => { Linking.openURL(`tel:${props.item.finderNumber}`) }}>
              <View style={styles.primaryButton} >
                <Text style={{ color: "white", fontWeight: "900" }} >Call Finder</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.7)",
    // backgroundColor: "black",
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    elevation: 5,
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
    elevation: 8,
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
export default ClaimForm;
