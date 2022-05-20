import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native"
import useCachedResources from './hooks/useCachedResources';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, UIManager } from 'react-native';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { User } from '@supabase/supabase-js';


import SignUp from "./routes/Signup"
import Login from "./routes/Login"
import Main from "./routes/Main"
import Onboarder from "./routes/Onboarder"

import { globalState } from './store/store'


export default function App() {

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


  const [isFirstLaunch, setIsFirstLaunch] = useState<null | Boolean>(null)
  const isLoadingComplete = useCachedResources();
  const Stack = createNativeStackNavigator()

  useEffect(() => {
    AsyncStorageLib.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        AsyncStorageLib.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
    AsyncStorageLib.getItem('supabase.auth.token',(error,data)=>{
      if(error){
        console.log(error)
        return
      }
      const supabaseAuthToken = JSON.parse(data as string)
      globalState.loggedInUser = supabaseAuthToken?.currentSession?.user as User
    })

  }, [])

  useEffect(()=>{
  },[])
  if (!isLoadingComplete) {
    return null
  } else {

    if (isFirstLaunch) {
      return (
        <SafeAreaProvider>
          <StatusBar />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Onboarder" component={Onboarder} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={SignUp} />
              <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>

      );
    } else if(globalState.loggedInUser){
      return (
        <SafeAreaProvider>
          <StatusBar />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={SignUp} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      )
    } 
    else {
      return (
        <SafeAreaProvider>
          <StatusBar />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={SignUp} />
              <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      );
    }
  }
}
