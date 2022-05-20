import { View, ScrollView, Pressable, Image, Modal, Text, StyleSheet, FlatList } from "react-native"

import SkeletonLoader from "expo-skeleton-loader";


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
  const [tabState,setTabState] = useState<'fetching'|'items-fetched'|'no-items-found'>('fetching')

  async function fetchClaimedItems() {
    const items = await getAllClaimedItems() as any[]
    items?.length > 0 ? setTabState('items-fetched') : setTabState('no-items-found')
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
    fetchClaimedItems();
    listenForChanges();
    return ()=>{
      try{
        supabase.removeAllSubscriptions()
      }catch{}
    };
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

  const SkeletonCard = ()=>
  (
    <SkeletonLoader
        boneColor={"#DDDBDD"}
        highlightColor={"white"}
        duration={1000}
        style={{
            marginVertical:5
    }}
    >
        <SkeletonLoader.Container
        >
          <SkeletonLoader.Item
            style={{
              width: 330,
              height: 200,
              borderRadius:20
            }}
          />
          <SkeletonLoader.Container style={{ paddingVertical: 10 }}>
            <SkeletonLoader.Item
              style={{ width: 100, height: 20, marginBottom: 5,borderRadius:25 }}
            />
            <SkeletonLoader.Item style={{ width: 50, height: 20, borderRadius:25 }} />
          </SkeletonLoader.Container>
        </SkeletonLoader.Container>
      </SkeletonLoader>
  )
  const NoItemsIndicator = () => {
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
      {
        tabState === 'no-items-found' ? <NoItemsIndicator /> 
        : tabState==='items-fetched' ? 
        <FlatList 
        data={claimedItems} 
        renderItem={renderCard} 
        keyExtractor={item => item.id} 
        style={{ width: '100%' }} />
        : Array.from(Array(3).keys()).map((key)=><SkeletonCard key={key}/>) 
      }

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
