
import { View, Modal, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'

const ClaimForm = (props: any) => {
  return (
    <Modal
      animationType="slide"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", }}
      transparent={true}
      visible={props.showModal}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image style={{ width: "100%", borderRadius: 20, marginBottom: 10 }} source={require('../assets/images/sampleImage.png')} />
          <Text>Blacked striped umbrella</Text>
          <Text>Found at Rc18</Text>
          <View style={styles.warning}>
            <Image style={{ width: 40, height: 40, marginRight: 15 }} source={require('../assets/images/warning.png')} />
            <Text style={{ width: "80%", color: "#FFB800", fontWeight: "bold" }}>Any issuie regarding wrongly claimed items must be resolved with the Finder. The platform does not handle these cases.</Text>
          </View>
          <TouchableOpacity >
            <View style={styles.primaryButton} >
              <Text style={{ color: "white", fontWeight: "900" }} >Call Finder</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.6}
          onPress={() => { props.setShowModal(false) }}
        >
          <View style={styles.closeModal}>
            <Image style={{ width: 20, height: 20 }} source={require('../assets/images/close.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    alignSelf: 'center',
    // opacity: 0,  
    width: "91%",
    borderRadius: 20,
    backgroundColor: "white",
    padding: 10,
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
    marginTop: 20,
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
