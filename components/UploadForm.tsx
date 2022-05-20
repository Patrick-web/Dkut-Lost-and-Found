import { View, Modal, Image, Text, StyleSheet, TextInput, ActivityIndicator, Pressable, } from 'react-native'
import { formStyles } from "../styles/global"
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { LostItem } from '../types'
import { globalState } from '../store/store'
import { postLostItem } from '../db/db'

import Button from './Button'
// https://tinypng.com/developers
const UploadForm = (props: any) => {
  const [image, setImage] = useState<string | null>(null);
  const [itemTitle, setItemTitle] = useState('');
  const [itemLocation, setItemLocation] = useState('');
  const [errors, setErrors] = useState({ title: '', location: '', image: '' })
  const userID = globalState.loggedInUser?.id || ''
  const [base64Image, setBase64Image] = useState('')
  const [isLoading, setIsLoading] = useState(false);


  async function createPost() {
    setErrors({ title: '', location: '', image: '' })
    let errorEncounter = false;
    if (itemTitle.length < 4) {
      setErrors((err) => ({
        ...err,
        title: 'Item name is too short (at least 4 characters)'
      }))
      errorEncounter = true;
    }
    if (itemLocation.length < 4) {
      setErrors((err) => ({
        ...err,
        location: 'Item name is too short (at least 4 characters)'
      }))
      errorEncounter = true;
    }
    if (!image) {
      setErrors((err) => ({
        ...err,
        image: 'Please provide and image of the item'
      }))
      errorEncounter = true;
    }
    if (errorEncounter) return;

    setIsLoading(true);

    const lostItem: LostItem = {
      id: Date.now().toString(),
      title: itemTitle,
      location: itemLocation,
      localImage: image,
      onlineImage: '',
      finderID: userID,
      finderNumber: globalState.loggedInUser?.user_metadata.phoneNumber,
      datePosted: (new Date()).toISOString(),
      isClaimed: false,
      claimDate: null,
      claimerID: null,
      isDeleted: false
    }
    const { error } = await postLostItem(lostItem, base64Image) as any;
    setIsLoading(false);

    setItemTitle('');
    setItemLocation('');
    setImage(null);

    props.setShowUploadForm(false);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,

    });

    if (!result.cancelled) {
      setImage(result.uri);
      setBase64Image(result.base64 as string)
    }
  }
  const captureImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've denied the app access to your camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync(
      {
        quality: 0.5,
        base64: true,
      }
    );
    if (!result.cancelled) {
      setImage(result.uri);
      setBase64Image(result.base64 as string)
    }
  }
  return (
    <Modal
      style={{ backgroundColor: "rgba(0,0,0,0.5)", }}
      onRequestClose={()=>props.setShowUploadForm(false)}
      animationType="slide"
      transparent={true}
      visible={props.showUploadForm}>
      <View style={styles.container}>


        <View style={styles.formWrapper}>
          {isLoading &&
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="black" />
              <Text style={{ color: 'black', marginTop: 10, fontWeight: 'bold', fontSize: 15 }}>Sending Post</Text>
            </View>
          }

          <Text style={{ fontSize: 25, marginBottom: 10, fontWeight: "bold", alignSelf: 'center' }}> Post a Lost Item </Text>
          <View style={{padding:10}}>
            <View style={{ width: '100%', marginBottom: 10 }} >
            <Text style={{ marginBottom: 5,}}>Add a picture of the item 🖼 (landscape)</Text>
            <View style={{ flexDirection: 'row', }}>
              <Button text={'Select Photo'} color={"#FF9387"} width={'40%'} styles={{transform: [{scale: 0.8}, {translateX:-18}]}} onPress={pickImage} />
              <Button text={'Take Photo'} color={"#FF9387"} width={'40%'} styles={{transform: [{scale: 0.8}, {translateX:-40}]}} onPress={pickImage} />
            </View>
            {errors.image != '' && <Text style={{ color: 'red', textAlign: 'center', fontSize: 12, marginLeft: 10 }}>{errors.image}</Text>}
          </View>
          {image && <Image source={{ uri: image }} style={styles.uploadImage} />}

          <View style={{ width: '100%', marginBottom: 10 }} >
            <Text style={{ marginBottom: 5 }}>What is the Item 🏮</Text>
            <TextInput value={itemTitle} onChangeText={(text) => setItemTitle(text)} style={formStyles.input} />
            {errors.title != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.title}</Text>}
          </View>
          <View style={{ width: '100%', marginBottom: 10 }} >
            <Text style={{ marginBottom: 5 }}>Where did you find it 🗺</Text>
            <TextInput value={itemLocation} onChangeText={(text) => setItemLocation(text)} style={formStyles.input} />
            {errors.location != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.location}</Text>}
          </View>
          </View>
          <View style={{padding:10,backgroundColor:'rgba(255,147,135,0.3)',alignItems:'center'}}>
            <Button text={'Post'} color={"#FF9387"} width={'50%'} onPress={createPost} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  formWrapper: {
    elevation: 20,
    backgroundColor: 'white',
    paddingTop: 10,
    margin:20,
    overflow:'hidden',
    width: "90%",
    borderRadius: 30,
  },
  form: {
    alignSelf: 'center',
    zIndex: 2,
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
    paddingTop: 20,
    paddingRight: 40,
    paddingLeft: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

  },
  loader: {
    position: 'absolute',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    zIndex: 3,
    bottom: 0,
    left: 0,
    width: '112%',
    height: '112%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  closeModal: {
    position: 'absolute',
    top: 0,
    zIndex: 4,
    // elevation: 10,
    backgroundColor: "crimson",
    borderColor: 'white',
    borderWidth: 4,
    transform: [
      { translateY: -30 }
    ],
    borderRadius: 30,
    padding: 20,
    width: 55,
    height: 55,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButton: {
    borderRadius: 10,
    backgroundColor: "#FF9387",
    paddingVertical:8,
    paddingHorizontal:12,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadImage: {
    width: '98%',
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  }
})
export default UploadForm;
