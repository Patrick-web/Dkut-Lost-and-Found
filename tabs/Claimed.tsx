import { View, ScrollView, TouchableOpacity, Image, Modal, Text, StyleSheet } from "react-native"
import { tabStyles } from "../styles/global"
import ClaimedCard from "../components/ClaimedCard"
import ClaimForm from "../components/ClaimForm"
import { useState } from "react"

const ClaimedTab = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <View style={tabStyles.tabDefaults}>
      <ClaimForm showModal={showModal} setShowModal={setShowModal} />
      <ScrollView style={{ width: '100%' }}>
        <ClaimedCard onPress={() => { console.log("clicked on") }} title="Striped Umbrella" claimDate="1/08/2022" image={require('../assets/images/sampleImage.png')} />
      </ScrollView>

    </View >
  )
}

const styles = StyleSheet.create({
  fabWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 30,

  },
  fab: {
    backgroundColor: "#FF9387",
    width: 50,
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  }

})
export default ClaimedTab;
