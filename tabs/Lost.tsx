import { View, Text, ScrollView } from "react-native"
import { tabStyles } from "../styles/global"
import SearchBar from "../components/Search"
import LostCard from "../components/LostCard"
const LostTab = () => {

  return (
    <View style={tabStyles.tabDefaults}>
      <SearchBar />
      <ScrollView style={{ width: '100%' }}>
        <LostCard />
        <LostCard />
        <LostCard />
        <LostCard />
        <LostCard />
      </ScrollView>


    </View>
  )
}

export default LostTab;
