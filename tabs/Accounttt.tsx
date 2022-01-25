import { View, Text, Image, ListView, ScrollView, FlatList } from "react-native"
import UploadedItemCard from "../components/UploadedItemCard"
import { tabStyles } from "../styles/global"
import { globalState } from '../store/store'
import { useEffect, useState } from "react"
import { getUserPostedItems } from "../db/db"
import { LostItem } from "../types"
import Animated from "react-native-reanimated"

const AccountTab = () => {
  const [userDetails, setUserDetails] = useState(globalState.loggedInUser)
  const [userPosts, setUserPosts] = useState<LostItem[]>([])
  const [subTotal, setSubTotal] = useState<number[]>([])

  async function getUserPosts() {
    const posts = await getUserPostedItems(userDetails?.id as string) as LostItem[]
    setUserPosts(posts as LostItem[])
    const finds = posts.filter((post) => !post.isClaimed).reduce((acc) => acc + 1, 0)
    const returns = posts.filter((post) => post.isClaimed).reduce((acc) => acc + 1, 0)
    console.log(finds)
    console.log(returns)
    setSubTotal([finds, returns])
    console.log("-=-")
    console.clear()
    // console.log(posts)
  }
  useEffect(() => {
    getUserPosts()
  }, [])

  const renderCard = ({ item }: { item: any }) => {
    return (
      <UploadedItemCard item={item}
      />
    )
  }


  return (
    <View style={tabStyles.tabDefaults}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View style={{ borderRadius: 10, margin: 10, backgroundColor: 'white', elevation: 2, width: 70, height: 70, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#FF9387' }}>{userDetails?.user_metadata.fullname.charAt(0)}</Text>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{userDetails?.user_metadata.fullname} </Text>
      </View>

      <View style={{ elevation: 4, justifyContent: 'space-around', flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#FF9387" }}>{subTotal[0]}</Text>
          {subTotal[0] > 1 ?
            <Text style={{ fontSize: 20, fontWeight: '300' }}>Finds</Text>
            :
            <Text style={{ fontSize: 20, fontWeight: '300' }}>Find</Text>
          }
        </View>
        <View style={{ width: 2, height: "100%", backgroundColor: 'black' }} />
        <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#FF9387" }}>{subTotal[1]}</Text>
          {subTotal[1] > 1 ?
            <Text style={{ fontSize: 20, fontWeight: '300' }}>Returns</Text>
            :
            <Text style={{ fontSize: 20, fontWeight: '300' }}>Return</Text>
          }
        </View>
      </View>
      <FlatList
        data={userPosts}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        style={{ width: "100%" }}
      />
    </View>
  )
}

export default AccountTab;
