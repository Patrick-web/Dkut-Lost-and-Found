import { View, Modal, Image, Text, StyleSheet, TextInput, ActivityIndicator, Pressable, } from 'react-native'
import { formStyles } from "../styles/global"
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { LostItem } from '../types'
import { globalState } from '../store/store'
import { editItem, postLostItem } from '../db/db'
import Button from './Button'

// https://tinypng.com/developers
const UploadForm = (props: any) => {
  const [image, setImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(props.item.onlineImage)
  const [itemTitle, setItemTitle] = useState(props.item.title);
  const [itemLocation, setItemLocation] = useState(props.item.location);
  const [errors, setErrors] = useState({ title: '', location: '', image: '' })
  const userID = globalState.loggedInUser?.id || ''
  const [base64Image, setBase64Image] = useState('')
  const [isLoading, setIsLoading] = useState(false);


  async function editPost() {
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
    if (errorEncounter) return;

    setIsLoading(true);

    const editedItem: LostItem = {
      id: props.item.id,
      title: itemTitle,
      location: itemLocation,
      localImage: image ? image : props.item.image,
      onlineImage: image ? "" : props.item.onlineImage,
      finderNumber: props.item.finderNumber,
      finderID: userID,
      datePosted: props.item.datePosted,
      isClaimed: false,
      claimDate: null,
      claimerID: null,
      isDeleted: false
    }
    const { error } = await editItem(editedItem, base64Image) as any;
    if (error) {
      console.log(error)
    }
    setIsLoading(false);

    setItemTitle('');
    setItemLocation('');
    setImage(null);

    props.editDone()
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
        allowsEditing: true,
        aspect: [4, 3],
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
      animationType="slide"
      transparent={true}
      visible={props.showUploadForm}>
      <View style={styles.container}>

        <Pressable onPress={() => { props.cancelEdit() }}
        >
          <View style={styles.closeModal}>
            <Image style={{ width: 20, height: 20 }} source={require('../assets/images/close.png')} />
          </View>
        </Pressable>

        <View style={styles.formWrapper}>
          {isLoading &&
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="black" />
              <Text style={{ color: 'black', marginTop: 10, fontWeight: 'bold', fontSize: 15 }}>Sending Post</Text>
            </View>
          }

          <Text style={{ fontSize: 25, marginBottom: 10, fontWeight: "bold", alignSelf: 'center' }}> Edit Item Details</Text>
          <View style={{ width: '100%', marginBottom: 20 }} >
            <Text style={{ marginBottom: 5, textAlign: 'center' }}>Change picture of the item (landscape)</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Pressable onPress={() => { pickImage() }} >
                <View style={styles.smallButton} >
                  <Text style={{ color: "white", fontWeight: "900" }} >Select Photo</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => { captureImage() }} >
                <View style={[styles.smallButton, { marginLeft: 20 }]} >
                  <Text style={{ color: "white", fontWeight: "900" }} >Take Photo</Text>
                </View>
              </Pressable>
            </View>
            {errors.image != '' && <Text style={{ color: 'red', textAlign: 'center', fontSize: 12, marginLeft: 10 }}>{errors.image}</Text>}
          </View>
          {image ? <Image source={{ uri: image }} style={styles.uploadImage} /> : <Image source={{ uri: currentImage }} style={styles.uploadImage} />}

          <View style={{ width: '100%', marginBottom: 10 }} >
            <Text style={{ marginBottom: 5 }}>What is the Item</Text>
            <TextInput value={itemTitle} onChangeText={(text) => setItemTitle(text)} style={formStyles.input} />
            {errors.title != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.title}</Text>}
          </View>
          <View style={{ width: '100%', marginBottom: 10 }} >
            <Text style={{ marginBottom: 5 }}>Where did you find it</Text>
            <TextInput value={itemLocation} onChangeText={(text) => setItemLocation(text)} style={formStyles.input} />
            {errors.location != '' && <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{errors.location}</Text>}
          </View>
          <Pressable onPress={editPost} >
            <View style={formStyles.button} >
              <Text style={{ color: "white", fontWeight: "bold" }} >Save Changes</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.35)",
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  formWrapper: {
    elevation: 20,
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
    width: "100%",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    overflow: 'hidden',
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
    borderRadius: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

  },
  loader: {
    position: 'absolute',
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
    elevation: 5,
    marginTop: -20,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 20,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButton: {
    borderRadius: 20,
    backgroundColor: "#FF9387",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
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
