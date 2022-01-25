
import { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Text, View } from "react-native"
import { signInUser } from '../db/db';
import { globalState } from '../store/store'
const LoginForm = ({ navigation, setIsLoading }: { navigation: any, setIsLoading: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  async function login() {
    setIsLoading(true);
    try {
      const user = await signInUser(email, password);
      if (user) {
        globalState.loggedInUser = user
        navigation.navigate('Main')
      } else {
        Alert.alert('Credentials Invalid')
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
    setEmail('');
    setPassword('')

  }
  return (
    <View style={styles.form}>
      <View style={{ width: '100%', marginBottom: 20 }} >
        <Text style={styles.tlabel}>Email</Text>
        <TextInput value={email} onChangeText={(text) => setEmail(text.trimEnd())} autoCapitalize={'none'} textContentType={'emailAddress'} style={styles.input} />
      </View>
      <View style={{ width: '100%', marginBottom: 20 }} >
        <Text style={styles.tlabel}>Password</Text>
        <TextInput value={password} onChangeText={(text) => setPassword(text)} keyboardType={'number-pad'} textContentType={'password'} style={styles.input} />
      </View>
      <TouchableOpacity onPress={login} >
        <View style={styles.primaryButton} >
          <Text style={{ color: "white", fontWeight: "900" }} >Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  form: {
    zIndex: 2,
    width: "80%",
    backgroundColor: "white",
    marginTop: 40,
    padding: 20,
    borderRadius: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    shadowColor: '#52006A',
  },
  tlabel: {
    marginBottom: 3,
  },
  input: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    borderRadius: 20,
    width: "100%",
    borderWidth: 1,

  },
  primaryButton: {
    borderRadius: 20,
    backgroundColor: "#FF9387",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: "center",
    alignItems: "center",
  }

})

export default LoginForm;
