import { Alert, Image, StyleSheet, Pressable } from 'react-native';
import { TextInput, Text, View } from "react-native"

import Svg, {Path} from 'react-native-svg';

import { AppUser } from '../types';
import { useState } from 'react';
import { signUpUser } from '../db/db';
import { globalState } from '../store/store'

const SignupForm = ({ navigation, setIsLoading }: { navigation: any, setIsLoading: any }) => {


  const [fullname, setFullname] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({ name: '', number: '', mail: '', password: '' })
  const [showWarning, setShowWarning] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  function isValidPhoneNumber(number: string) {
    const lengthReg = /\d{10}/gm;
    const isGoodLength = lengthReg.test(number);
    const firstTwo = number.charAt(0) + number.charAt(1);
    console.log("first " + firstTwo)
    if (firstTwo === '01' || firstTwo === '07' && isGoodLength) {
      return true;
    } else {
      return false;
    }
  }
  function isValidFullname(name: string) {
    const spaceReg = /.*\s.*/gm;
    const isValidName = spaceReg.test(name);
    console.log(isValidName);
    return isValidName;
  }
  function isValidEmail(email: string) {
    const mailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const isValidEmail = mailReg.test(email);
    return isValidEmail;
  }

  async function createUser() {
    setErrors({ name: '', number: '', mail: '', password: '' })

    let errorEncounter = false;
    if (!isValidFullname(fullname)) {
      setErrors(err => ({
        ...err,
        ...{ name: 'Please enter your full name' },
      }))
      errorEncounter = true;
    }
    if (!isValidEmail(email)) {
      setErrors((err) => ({
        ...err,
        ...{ mail: 'Please enter a valid email' }
      }))
      errorEncounter = true;
    }
    if (!isValidPhoneNumber(number)) {
      setErrors(err => ({
        ...err,
        ...{ number: 'Please enter a valid phone number' }
      }))
      errorEncounter = true;
    }
    if (password.length < 6) {
      setErrors((err) => ({
        ...err,
        password: 'Password too short'
      }))
      errorEncounter = true;
    }
    if (errorEncounter) {
      console.log(errors)
      return;
    }
    const newUser: AppUser = {
      id: Date.now().toString(),
      fullName: fullname,
      phoneNumber: number,
      email: email,
      password: password
    }

    setIsLoading(true)

    try {
      const user = await signUpUser(newUser);
      if (user) {
        globalState.loggedInUser = user
        navigation.navigate('Main')
      } else {
        Alert.alert('Erro while sign up. Please try again')
      }
    } catch (error) {
      alert(error)
    }
    setIsLoading(false)
  }

  return (
    <View style={styles.form}>
      <View style={{ width: '100%', marginBottom: 20 }} >
        <Text style={styles.tlabel}>Full Name</Text>
        <TextInput textContentType={'name'} onChangeText={(textValue) => setFullname(textValue)} style={styles.input} />
        {errors.name != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.name.trim()}</Text>}
      </View>
      <View style={{ width: '100%', marginBottom: 20 }} >
        <Text style={styles.tlabel}>Phone Number</Text>
        <TextInput textContentType={'telephoneNumber'} onFocus={() => setShowWarning(true)} onChangeText={(textValue) => { setNumber(textValue); setShowWarning(false) }} style={styles.input} />
        {errors.number != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.number.trim()}</Text>}
        {showWarning &&
          <View style={styles.warning}>
            <Image style={{ width: 30, height: 30, marginRight: 10 }} source={require('../assets/images/warning.png')} />
            <Text style={{ width: "80%", color: "#FFB800", fontWeight: "bold" }}>This number will be used by the potential owner to contact you. Please provide the number you want for this function</Text>
          </View>
        }

      </View>
      <View style={{ width: '100%', marginBottom: 20 }} >
        <Text style={styles.tlabel}>Email</Text>
        <TextInput textContentType={'emailAddress'} autoCompleteType={'email'} autoCapitalize={'none'} onChangeText={(textValue) => setEmail(textValue.trim())} style={styles.input} />
        {errors.mail != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.mail}</Text>}
      </View>
      <View style={{ width: '100%', marginBottom: 20 }} >
        <Text style={styles.tlabel}>Password</Text>
        <TextInput secureTextEntry={hidePassword} textContentType={'newPassword'} autoCompleteType={'password'} placeholder={'6 characters minimum'} onChangeText={(text)=>setPassword(text)} style={styles.input} />
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

        {errors.password != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.password.trim()}</Text>}
      </View>
      <Pressable onPress={createUser} >
        <View style={styles.primaryButton} >
          <Text style={{ color: "white", fontWeight: "900" }} >Sign Up</Text>
        </View>
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  form: {
    zIndex: 4,
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
  },
  warning: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "rgba(255,214,107,0.33)",
    borderRadius: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: 'center',
  },
})

export default SignupForm;
