import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native"
import useCachedResources from './hooks/useCachedResources';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from "./routes/Signup"
import Login from "./routes/Login"
import Main from "./routes/Main"

export default function App() {
  const isLoadingComplete = useCachedResources();

  const Stack = createNativeStackNavigator()

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={Main} />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
