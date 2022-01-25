import { ActivityIndicator, Alert, Image, Modal, Pressable, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native';
import { TextInput, Text, View } from "react-native"
import { AppUser } from '../types';
import { useState } from 'react';
import { updateUserInfo } from '../db/db';
import { globalState } from '../store/store'

const UpdateUserDetails = ({ currentDetails, updateUserDetails, showModal, setShowModal }: { currentDetails: any, showModal: any, updateUserDetails: (data: any) => any, setShowModal: (state: any) => any }) => {
  const [fullname, setFullname] = useState(currentDetails.user_metadata.fullname);
  const [number, setNumber] = useState(currentDetails.user_metadata.phoneNumber);
  const [email, setEmail] = useState(currentDetails.email);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ name: '', number: '', mail: '', password: '' })

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
    const updatedUser: AppUser = {
      id: Date.now().toString(),
      fullName: fullname,
      phoneNumber: number,
      email: email,
      password: password
    }

    setIsLoading(true)

    try {
      const user = await updateUserInfo(updatedUser);
      setIsLoading(false)
      if (user) {
        ToastAndroid.show('Details updated', ToastAndroid.SHORT)
        updateUserDetails(user)
      } else {
        ToastAndroid.show('Error updating details', ToastAndroid.SHORT)
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Modal
      animationType="slide"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", }}
      transparent={true}
      visible={showModal}>
      <View style={styles.container}>


        <Pressable
          onPress={() => { setShowModal(false) }}
        >
          <View style={styles.closeModal}>
            <Image style={{ width: 20, height: 20 }} source={require('../assets/images/close.png')} />
          </View>
        </Pressable>
        <View style={styles.form}>
          {isLoading &&
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="black" />
            </View>
          }

          <Text style={{ fontSize: 25, marginBottom: 10, fontWeight: "bold", alignSelf: 'center' }}>Edit Account Details </Text>
          <View style={{ width: '100%', marginBottom: 20 }} >
            <Text style={styles.tlabel}>Full Name</Text>
            <TextInput textContentType={'name'} value={fullname} onChangeText={(textValue) => setFullname(textValue)} style={styles.input} />
            {errors.name != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.name.trim()}</Text>}
          </View>
          <View style={{ width: '100%', marginBottom: 20 }} >
            <Text style={styles.tlabel}>Phone Number</Text>
            <TextInput textContentType={'telephoneNumber'} value={number} onChangeText={(textValue) => setNumber(textValue)} style={styles.input} />
            {errors.number != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.number.trim()}</Text>}
          </View>
          <View style={{ width: '100%', marginBottom: 20 }} >
            <Text style={styles.tlabel}>Email</Text>
            <TextInput textContentType={'emailAddress'} value={email} autoCapitalize={'none'} onChangeText={(textValue) => setEmail(textValue.trim())} style={styles.input} />
            {errors.mail != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.mail}</Text>}
          </View>
          <View style={{ width: '100%', marginBottom: 20 }} >
            <Text style={styles.tlabel}>New Password</Text>
            <TextInput textContentType={'newPassword'} keyboardType={'numeric'} placeholder={'6 characters minimum'} onChangeText={handlePin} style={styles.input} />
            {errors.password != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.password.trim()}</Text>}
          </View>
          <TouchableOpacity onPress={createUser} >
            <View style={styles.primaryButton} >
              <Text style={{ color: "white", fontWeight: "900" }} >Save Changes</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.7)",
    // backgroundColor: "black",
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  form: {
    zIndex: 4,
    width: "100%",
    backgroundColor: "white",
    padding: 20,
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
  closeModal: {
    elevation: 8,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 20,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    zIndex: 6,
    top: 0,
    left: 0,
    width: '112%',
    height: '112%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(255,255,255,0.9)",
  },
})

export default UpdateUserDetails;
