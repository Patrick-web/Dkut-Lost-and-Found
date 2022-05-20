import { useState } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native"



const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState('lost');


  return (
    <View style={styles.switcher}>
      <Pressable onPress={() => {
        setActiveTab('lost')
      }}>
        <View style={[styles.switch, activeTab == 'lost' ? styles.activeSwitch : {}]}>
          <Image style={{ width: 20, height: 20 }} source={require('../assets/images/lost.png')} />
          <Text style={styles.switchLabel}>Lost</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => {
        setActiveTab('claimed')
      }}>
        <View style={[styles.switch, activeTab == 'claimed' ? styles.activeSwitch : {}]}>
          <Image style={{ width: 20, height: 20 }} source={require('../assets/images/claimed.png')} />
          <Text style={styles.switchLabel}>Claimed</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => {
        setActiveTab('account')
      }}>
        <View style={[styles.switch, activeTab == 'account' ? styles.activeSwitch : {}]}>
          <Image style={{ width: 20, height: 20 }} source={require('../assets/images/account.png')} />
          <Text style={styles.switchLabel}>Account</Text>
        </View>
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  switcher: {
    zIndex: 3,
    borderRadius: 40,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: '#898989',
    flex: 1,
    width: "95%",
    position: "absolute",
    bottom: 10,
    left: "3%",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  switch: {
    height: 50,
    width: 80,
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 12,
  },
  activeSwitch: {
    backgroundColor: "#FF9387",
    borderRadius: 40,
  }
})

export default TabSwitcher;
