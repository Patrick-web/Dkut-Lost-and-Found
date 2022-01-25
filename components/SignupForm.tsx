import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Text, View } from "react-native"
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
  function handlePin(text: string) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
      else {
        alert("Please enter numbers only");
      }
    }
    setPassword(newText);
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
        <TextInput textContentType={'emailAddress'} autoCapitalize={'none'} onChangeText={(textValue) => setEmail(textValue.trim())} style={styles.input} />
        {errors.mail != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.mail}</Text>}
      </View>
      <View style={{ width: '100%', marginBottom: 20 }} >
        <Text style={styles.tlabel}>Password</Text>
        <TextInput textContentType={'newPassword'} keyboardType={'numeric'} placeholder={'6 characters minimum'} onChangeText={handlePin} style={styles.input} />
        {errors.password != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.password.trim()}</Text>}
      </View>
      <TouchableOpacity onPress={createUser} >
        <View style={styles.primaryButton} >
          <Text style={{ color: "white", fontWeight: "900" }} >Sign Up</Text>
        </View>
      </TouchableOpacity>
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
