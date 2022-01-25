import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native"
import { tabStyles } from "../styles/global"
import SearchBar from "../components/Search"
import LostCard from "../components/LostCard"
import PopoutItem from "../components/PopoutItem"
import UploadForm from "../components/UploadForm"
import { useEffect, useState } from "react"
import { LostItem } from "../types"
import { getAllLostItems, supabase } from "../db/db"
import { RealtimeSubscription } from "@supabase/supabase-js"

const LostTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredResults, setFilteredResults] = useState<LostItem[]>()
  async function fetchLostItems() {
    const items = await getAllLostItems()
    if (items) {
      setLostItems(items);
      setFilteredResults(items);
    }
  }

  function filterItems(filteredItems: any) {
    filteredItems = filteredItems.map((obj: any) => obj.item)
    console.log("-------------")
    console.log(filteredItems);
    setFilteredResults(filteredItems)
  }

  const listenForChanges = async () => {
    console.log("Listen for changes")
    const sub = supabase
      .from('Lost')
      .on('*', () => {
        fetchLostItems()
      })
      .subscribe()
    return sub
  }
  useEffect(() => {
    let unsub: Promise<RealtimeSubscription>;
    fetchLostItems().finally(() => {
      unsub = listenForChanges();
    })
    function wrap() {
      (function unsubscribe() {
        return async () => await unsub
      })()
    }
    return wrap;
  }, [])

  const renderCard = ({ item }: { item: any }) => {
    return (
      <LostCard item={item}
        onPress={() => { setSelectedItem(item); setShowModal(true) }}
      />
    )
  }
  const MissingIndicator = () => {
    return (
      <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <Image style={{ width: 400, height: 400 }} source={require('../assets/images/missingillustration.png')} />
        <Text style={{ color: 'grey' }}>🍃 Hakuna any Posts Yet 🍃</Text>
        <Text style={{ color: 'grey' }}>Click on hiyo Camera icon 📷</Text>
        <Text style={{ color: 'grey' }}>to post an Item you have found</Text>
      </View>
    )
  }
  return (
    <View style={tabStyles.tabDefaults}>

      {lostItems.length > 0 && < SearchBar clearSearch={() => setFilteredResults(lostItems)} items={lostItems} filterhandler={(data) => { filterItems(data) }} />}
      {selectedItem && <PopoutItem item={selectedItem} showModal={showModal} setShowModal={setShowModal} />}
      {lostItems.length === 0 ? <MissingIndicator /> : <FlatList data={filteredResults} renderItem={renderCard} keyExtractor={item => item.id} style={{ width: '100%' }} />}
      {showUploadForm && <UploadForm showUploadForm={showUploadForm} setShowUploadForm={setShowUploadForm} />}
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
    elevation: 8,
    shadowColor: '#898989',
  }

})
export default LostTab;
