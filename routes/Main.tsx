import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from "react-native";

import LostTab from "../tabs/Lost"
import ClaimedTab from "../tabs/Claimed"
import AccountTab from "../tabs/Account"

const TabManager = createBottomTabNavigator();

const Main = () => {

  return (
    <TabManager.Navigator screenOptions={{
      headerShown: false,
    }}>
      <TabManager.Screen
        options={{
          tabBarActiveTintColor: "#FF9387",
          tabBarIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('../assets/images/lost.png')} />)
        }}
        name="Lost" component={LostTab} />
      <TabManager.Screen
        options={{
          tabBarActiveTintColor: "#FF9387",
          tabBarIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('../assets/images/claimed.png')} />)
        }}
        name="Claimed" component={ClaimedTab} />
      <TabManager.Screen
        options={{
          tabBarActiveTintColor: "#FF9387",
          tabBarIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('../assets/images/account.png')} />)
        }}
        name="Account" component={AccountTab} />
    </TabManager.Navigator>
  )
}

// const styles = StyleSheet.create({
//   switcher: {
//     zIndex: 3,
//     borderRadius: 40,
//     paddingBottom: 5,
//     backgroundColor: "white",
//     elevation: 2,
//     shadowColor: '#898989',
//     flex: 1,
//     width: "95%",
//     position: "absolute",
//     bottom: 10,
//     left: "3%",
//   }
// })
export default Main;
