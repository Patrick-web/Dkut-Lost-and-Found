import { View, ScrollView, TouchableOpacity, Image, Modal, Text, StyleSheet } from "react-native"
import { tabStyles } from "../styles/global"
import SearchBar from "../components/Search"
import LostCard from "../components/LostCard"
import PopoutItem from "../components/PopoutItem"
import UploadForm from "../components/UploadForm"
import { useState } from "react"

const LostTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  return (
    <View style={tabStyles.tabDefaults}>
      <SearchBar />
      <PopoutItem showModal={showModal} setShowModal={setShowModal} />
      <ScrollView style={{ width: '100%' }}>
        <LostCard onPress={() => { console.log("clicked on") }} title="Test title" location="rc18" image={require('../assets/images/sampleImage.png')} />
      </ScrollView>
      <UploadForm showUploadForm={showUploadForm} setShowUploadForm={setShowUploadForm} />

      <TouchableOpacity onPress={() => { setShowUploadForm(true) }} style={styles.fabWrapper} >
        <View style={styles.fab}>
          <Image style={{ width: 25, height: 25 }} source={require('../assets/images/camera.png')} />
        </View>
      </TouchableOpacity>
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
export default LostTab;
