import { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import LoadingIndicator from '../components/LoadingIndicator';
import LoginForm from "../components/LoginForm"

const Login = ({ navigation }: { navigation: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Image style={styles.waveTop} source={require('../assets/images/wave1.png')} />
      <Text style={styles.pageTitle} >Login</Text>
      <LoginForm navigation={navigation} setIsLoading={setIsLoading} />
      <Image style={styles.waveBottom} source={require('../assets/images/wave2.png')} />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', alignItems: 'center', padding: 10 }}>
        <Button onPress={() => navigation.navigate('Signup')} style={{ elevation: 4 }} textColor={"#FF9387"} width={100} padding={5} radius={20} color={'white'} text={'Sign Up'} />
      </View>
      {isLoading && <LoadingIndicator />}
    </View>
  )
}

const styles = StyleSheet.create({
  waveTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  pageTitle: {
    position: "absolute",
    top: 40,
    left: 40,
    color: "white",
    fontSize: 40,
    fontWeight: "bold"
  },
  waveBottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
})
export default Login;
