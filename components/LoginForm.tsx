import {  useState } from 'react';

import Svg, {Path} from 'react-native-svg';

import { Alert, StyleSheet, Pressable } from 'react-native';
import { TextInput, Text, View } from "react-native"
import { signInUser } from '../db/db';
import { globalState } from '../store/store'


const LoginForm = ({ navigation, setIsLoading }: { navigation: any, setIsLoading: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true);

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
        <TextInput value={email} onChangeText={(text) => setEmail(text.trimEnd())} autoCapitalize={'none'} textContentType={'emailAddress'} autoCompleteType={'email'} style={styles.input} />
      </View>
      <View style={{ width: '100%', marginBottom: 20, position:'relative' }} >
        <Text style={styles.tlabel}>Password</Text>
        <TextInput secureTextEntry={hidePassword} value={password} onChangeText={(text) => setPassword(text)} textContentType={'password'} autoCompleteType={'password'} style={styles.input} />
       {hidePassword ?
        <Pressable style={{position:'absolute', right:0,top:"35%",padding:10}} onPress={()=>setHidePassword(false)}>
          <Svg fill="none" stroke="black" viewBox="0 0 24 24" width="27" height="22" strokeWidth={2}>
          <Path  strokeLinecap={"round"} strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <Path strokeLinecap={"round"} strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />  
          </Svg>
        </Pressable>
        :
        <Pressable style={{position:'absolute', right:0,top:"35%",padding:10}} onPress={()=>setHidePassword(true)}>
          <Svg fill="none" stroke="black" viewBox="0 0 24 24" width="27" height="22" strokeWidth={2}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </Svg>
        </Pressable>
         } 

      </View>
      <Pressable onPress={login} >
        <View style={styles.primaryButton} >
          <Text style={{ color: "white", fontWeight: "900" }} >Login</Text>
        </View>
      </Pressable>
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
