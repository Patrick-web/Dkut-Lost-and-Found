
import { View, Image, Text, StyleSheet } from 'react-native';
import LoginForm from "../components/LoginForm"

const Login = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Image style={styles.waveTop} source={require('../assets/images/wave1.png')} />
      <Text style={styles.pageTitle} >Login</Text>
      <LoginForm />
      <Image style={styles.waveBottom} source={require('../assets/images/wave2.png')} />
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
