import { View, Text, Image, ListView, ScrollView } from "react-native"
import UploadedItemCard from "../components/UploadedItemCard"
import { tabStyles } from "../styles/global"

const AccountTab = () => {
  return (
    <View style={tabStyles.tabDefaults}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Image style={{ width: 100, height: 100, borderRadius: 50, margin: 20 }} source={require('../assets/images/sampleImage.png')} />
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Patrick Waweru</Text>
      </View>

      <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 20 }}>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>3</Text>
          <Text style={{ fontSize: 20, fontWeight: '300' }}>Finds</Text>
        </View>
        <View style={{ width: 2, height: "100%", backgroundColor: 'black' }} />
        <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>2</Text>
          <Text style={{ fontSize: 20, fontWeight: '300' }}>Returns</Text>
        </View>
      </View>
      <ScrollView style={{ width: '100%', marginTop: 20 }}>
        <UploadedItemCard />
        <UploadedItemCard />
      </ScrollView>
    </View>
  )
}

export default AccountTab;
