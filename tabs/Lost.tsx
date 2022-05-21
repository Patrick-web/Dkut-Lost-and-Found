import { View, Text, Pressable, StyleSheet, Image, FlatList, ScrollResponderEvent } from "react-native"
import Svg, {Path} from 'react-native-svg';

import SkeletonLoader from "expo-skeleton-loader";

import {Notification} from "../types"

import { tabStyles } from "../styles/global"
import SearchBar from "../components/Search"
import LostCard from "../components/LostCard"
import PopoutItem from "../components/PopoutItem"
import UploadForm from "../components/UploadForm"
import { useEffect, useState } from "react"
import { LostItem } from "../types"
import { getAllLostItems, supabase } from "../db/db"

const LostTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredResults, setFilteredResults] = useState<LostItem[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [tabState,setTabState] = useState<'fetching'|'items-fetched'|'no-items-found'>('fetching')

  async function fetchLostItems() {
    setLoading(true)
    const items = await getAllLostItems() as any[]
    items?.length > 0 ? setTabState('items-fetched') : setTabState('no-items-found')
    setLoading(false)
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
  async function listenForChanges(){
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
    fetchLostItems()    
    listenForChanges()
    return ()=>{
      try{
        supabase.removeAllSubscriptions()
      }catch{}
    };
  }, [])

  const renderCard = ({ item }: { item: any }) => {
    return (
      <LostCard item={item}
        onPress={() => { setSelectedItem(item); setShowModal(true) }}
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

      {
        tabState === 'no-items-found' ? <NoItemsIndicator /> 
        : tabState==='items-fetched' ? 
        <FlatList 
        refreshing={loading} 
        onRefresh={fetchLostItems} 
        data={filteredResults} 
        renderItem={renderCard} 
        keyExtractor={item => item.id} 
        style={{ width: '100%' }} />
        : Array.from(Array(3).keys()).map((key)=><SkeletonCard key={key}/>) 
      }
      {showUploadForm && <UploadForm showUploadForm={showUploadForm} setShowUploadForm={setShowUploadForm} />}
      <Pressable onPress={() => { setShowUploadForm(true) }} style={styles.fabWrapper} >
        <View style={styles.fab}>
<Svg width="27" height="22" viewBox="0 0 27 22" fill="none">
<Path d="M18 15L14 11M14 11L10 15M14 11V20M22.39 17.39C23.3654 16.8583 24.1359 16.0169 24.5799 14.9986C25.0239 13.9804 25.1162 12.8432 24.8422 11.7667C24.5682 10.6902 23.9435 9.73553 23.0667 9.05346C22.1899 8.3714 21.1109 8.00075 20 8.00001H18.74C18.4373 6.82926 17.8732 5.74235 17.09 4.82101C16.3068 3.89967 15.3249 3.16786 14.2181 2.68062C13.1114 2.19338 11.9086 1.96337 10.7001 2.0079C9.4917 2.05242 8.30909 2.37031 7.2412 2.93768C6.17331 3.50505 5.24793 4.30712 4.53464 5.2836C3.82135 6.26008 3.33871 7.38555 3.123 8.57541C2.90729 9.76527 2.96413 10.9885 3.28923 12.1533C3.61434 13.318 4.19926 14.3939 5.00002 15.3" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>


        </View>
      </Pressable>
    </View >
  )
}

const styles = StyleSheet.create({
  fabWrapper: {
    position: 'absolute',
    bottom: 20,
    right: "38%",

  },
  fab: {
    backgroundColor: "#FF9387",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#898989',
  }

})
export default LostTab;
