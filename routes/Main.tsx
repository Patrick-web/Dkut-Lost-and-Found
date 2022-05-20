import {LayoutAnimation} from 'react-native'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {LinearGradient} from 'expo-linear-gradient';
import { View,Text,Image,Pressable, StyleSheet } from "react-native";
import LostTab from "../tabs/Lost"
import ClaimedTab from "../tabs/Claimed"
import AccountTab from "../tabs/Account"
import {  Route } from '@react-navigation/native';

const TabManager = createBottomTabNavigator();

function CustomTabBar({state,descriptors,navigation}:{ state: any,descriptors: any,navigation: any }) {
  return (
    <View style={{ flexDirection: 'row',backgroundColor:'white' }}>
      {state.routes.map((route: Route<any>, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, position:'relative',margin:5, height:50}}
          >
          <View
            style={{ flex: 1, flexDirection:'column', alignItems:'center',borderRadius:30,padding:5 }}
          >
          {
            label=='Lost'?<Image style={{width: isFocused?20:30, height: isFocused?20:30}} source={require('../assets/images/lost.png')}/>
            :label=='Claimed'?<Image style={{width: isFocused?20:30, height: isFocused?20:30}} source={require('../assets/images/claimed.png')}/>
            :<Image style={{width: isFocused?20:30, height: isFocused?20:30}} source={require('../assets/images/account.png')}/>
          }
            <Text style={{maxHeight:isFocused?100:0,color:'white',fontWeight:isFocused?'bold':'normal' }}>
              {label}
              </Text>
                    {
            isFocused &&
          <LinearGradient
            colors={['#FFB47B', '#FF878A']}
            style={{ position:'absolute',zIndex:-1,height:50,width:80,borderRadius:10,bottom:0 }}
          >
          </LinearGradient>
          }
          </View>

          </Pressable>
        );
      })}
    </View>
  );
}
const Main = () => {

  return (
    <TabManager.Navigator tabBar={(props: BottomTabBarProps)=><CustomTabBar {...props}/>} screenOptions={{
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
