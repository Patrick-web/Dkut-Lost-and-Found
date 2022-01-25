import { View, ScrollView, TouchableOpacity, Image, Modal, Text, StyleSheet, FlatList } from "react-native"
import { tabStyles } from "../styles/global"
import ClaimedCard from "../components/ClaimedCard"
import ClaimForm from "../components/ClaimForm"
import { LostItem } from "../types"
import { RealtimeSubscription } from "@supabase/supabase-js"
import { getAllClaimedItems, supabase } from "../db/db"
import { useEffect, useState } from "react"

const ClaimedTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null)
  const [claimedItems, setClaimedItems] = useState<LostItem[]>([])
  async function fetchClaimedItems() {
    const items = await getAllClaimedItems()
    if (items) {
      setClaimedItems(items.reverse());
    }
  }

  const listenForChanges = async () => {
    console.log("Listen for changes")
    const sub = supabase
      .from('Lost')
      .on('*', () => {
        fetchClaimedItems()
      })
      .subscribe()
    return sub
  }
  useEffect(() => {
    let unsub: Promise<RealtimeSubscription>;
    fetchClaimedItems().finally(() => {
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
      <ClaimedCard item={item}
        onPress={() => {
          setSelectedItem(item);
          setShowModal(true);
        }}
      />
    )
  }

  const MissingIndicator = () => {
    return (
      <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <Image style={{ width: 400, height: 400 }} source={require('../assets/images/emptyillustration.png')} />
        <Text style={{ color: 'grey' }}> No Items have been claimed 👨‍⚖️</Text>
      </View>
    )
  }

  return (
    <View style={tabStyles.tabDefaults}>
      {showModal && <ClaimForm item={selectedItem} showModal={showModal} setShowModal={setShowModal} />}
      {claimedItems.length > 0 && <Image source={require('../assets/images/waves.png')} style={{ position: 'absolute', width: 370, height: 700, top: 20 }} />}
      {claimedItems.length === 0 ? <MissingIndicator /> : <FlatList data={claimedItems} renderItem={renderCard} keyExtractor={item => item.id} style={{ width: '100%' }} />}
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
