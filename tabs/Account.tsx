import React, { useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  View,
  Modal,
  Image,
  Pressable
} from 'react-native';

import { tabStyles } from "../styles/global"
import { globalState } from '../store/store'
import { useEffect, useState } from "react"
import { deleteLostItem, getUserPostedItems, toggleItemIsReturned } from "../db/db"
import UploadedItemCard from "../components/UploadedItemCard"
import EditForm from "../components/EditForm"
import { LostItem } from "../types"
import Button from '../components/Button';
import UpdateUserDetails from '../components/UpdateUserDetails';

const AccountTab = ({ navigation }: { navigation: any }) => {
  const scrollPosition = useRef(new Animated.Value(0)).current;
  const minHeaderHeight = 0
  const maxHeaderHeight = 200

  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 600],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: 'clamp',
  });
  const opacity = scrollPosition.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });
  const [userDetails, setUserDetails] = useState(globalState.loggedInUser)
  const [userPosts, setUserPosts] = useState<LostItem[]>([])
  const [subTotal, setSubTotal] = useState<number[]>([])
  const [itemToDelete, setItemToDelete] = useState<LostItem | null>(null)
  const [itemToEdit, setItemToEdit] = useState<LostItem | null>(null);

  const [loadingItem, setLoadingItem] = useState<string>('')
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [showAccountEditor, setShowAccountEditor] = useState(false);
  async function getUserPosts() {
    setIsRefreshing(true)
    const posts = await getUserPostedItems(userDetails?.id as string) as LostItem[]
    setIsRefreshing(false)
    setUserPosts(posts as LostItem[])
    const finds = posts.reduce((acc) => acc + 1, 0)
    const returns = posts.filter((post) => post.isClaimed).reduce((acc) => acc + 1, 0)
    setSubTotal([finds, returns])
    // console.log(posts)
  }

  async function deletePostedItem() {
    const { data, error } = await deleteLostItem(itemToDelete?.id as string);
    if (!error) {
      getUserPosts();
      setItemToDelete(null)
    }
  }


  async function logout() {
    navigation.navigate('Login')
  }

  function updateUserDetails(newDetails: any) {
    globalState.loggedInUser = newDetails
    setUserDetails(newDetails)
    setShowAccountEditor(false)
  }

  useEffect(() => {
    console.log("Getting user posts")
    getUserPosts()
  }, [])

  const renderCard = ({ item }: { item: LostItem }) => {
    function deleteItem() {
      console.log("Deleting...")
      console.log(item.id)
      setItemToDelete(item)
    }
    function editItem() {
      setItemToEdit(item)
    }
    async function toggleIsReturned(state: Boolean) {
      setLoadingItem(item.id)
      const { error } = await toggleItemIsReturned(item.id, state)
      setLoadingItem('')
      if (!error) {
        getUserPosts()
      }
    }

    return (
      <UploadedItemCard toggleIsReturned={toggleIsReturned} isLoading={item.id === loadingItem ? true : false} editItem={editItem} deleteItem={deleteItem} item={item}
      />
    )
  }

  const ConfirmDeleteModal = () => {
    return (
      <Modal
        style={{ backgroundColor: "rgba(0,0,0,0.5)", }}
        animationType="slide"
        transparent={true}
        visible={itemToDelete ? true : false}
      >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', width: '100%', height: "100%", zIndex: 5, justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={{ backgroundColor: "white", elevation: 30, shadowColor: 'black', padding: 10, margin: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: 'bold', color: 'black', opacity: 0.7, textAlign: 'center' }}>Continue to Delete this Item</Text>
            <View>
              <Image source={{ uri: itemToDelete?.onlineImage }} style={{ width: 330, height: 200, marginBottom: 5 }}></Image>
              <Text>{itemToDelete?.title}</Text>
              <Text>{itemToDelete?.location}</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', padding: 10, }}>
              <Button onPress={() => setItemToDelete(null)} style={{ marginRight: 10 }} color={'crimson'} text={'No'} radius={20} width={"50%"} padding={10} />
              <Button onPress={deletePostedItem} color={'#009545'} text={'Yes'} radius={20} width={"50%"} height={'auto'} padding={10} />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View style={tabStyles.tabDefaults}>
      <Image style={styles.waveTop} source={require('../assets/images/wave1.png')} />
      <ConfirmDeleteModal />
      {itemToEdit && <EditForm editDone={() => { getUserPosts(); setItemToEdit(null) }} item={itemToEdit} cancelEdit={() => { setItemToEdit(null) }} />}
      <UpdateUserDetails updateUserDetails={updateUserDetails} currentDetails={globalState.loggedInUser} showModal={showAccountEditor} setShowModal={() => { setShowAccountEditor(false) }} />
      <View
        style={{
          overflow: 'hidden',
          height: 200,
        }}>

        <View style={{ flexDirection: 'column', alignItems: 'center', }}>
          <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'center', width: "100%" }}>
            <Pressable style={{ marginRight: -5, alignItems: 'center', justifyContent: 'center', backgroundColor: "white", width: 40, height: 40, borderRadius: 20 }} onPress={() => { setShowAccountEditor(true) }} >
              <Image style={{ width: 15, height: 15 }} source={require('../assets/images/edit.png')} />
            </Pressable>
            <View style={{ borderRadius: 40, backgroundColor: 'white', elevation: 3, width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FF9387' }}>{userDetails?.user_metadata.fullname.charAt(0)}</Text>
            </View>
            <Pressable onPress={logout} style={{ marginLeft: -5, alignItems: 'center', justifyContent: 'center', backgroundColor: "white", width: 40, height: 40, borderRadius: 20 }} >
              <Image style={{ width: 15, height: 15 }} source={require('../assets/images/logout.png')} />
            </Pressable>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>{userDetails?.user_metadata.fullname} </Text>
        </View>

        <View style={{ elevation: 4, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
          <View style={styles.infoBox}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black" }}>{subTotal[0]}</Text>
            <Text style={{ fontWeight: '300' }}>Found</Text>
          </View>
          <View style={{ width: 10, height: 0, backgroundColor: 'white' }} />
          <View style={styles.infoBox}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black" }}>{subTotal[1]}</Text>
            <Text style={{ fontWeight: '300' }}>Returned</Text>
          </View>
        </View>

      </View>


      < Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollPosition } } }],
          { useNativeDriver: false },
        )
        }
        contentInsetAdjustmentBehavior="automatic"
        data={userPosts}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        onRefresh={() => { getUserPosts() }}
        refreshing={isRefreshing}
        style={{ width: "100%" }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  waveTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  infoBox: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 40,
    width: 80,
    elevation: 5,
  }
});
export default AccountTab
