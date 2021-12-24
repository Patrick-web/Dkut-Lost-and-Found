import { View, Modal, Image, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import { formStyles } from "../styles/global"
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { ExpoImageResult } from '../types'



const UploadForm = (props: any) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }) as ExpoImageResult;

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
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
        quality: 1,
      }
    );
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  }
  return (
    <Modal
      animationType="slide"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", }}
      transparent={true}
      visible={props.showUploadForm}>
      <View style={styles.container}>

        <TouchableOpacity activeOpacity={0.6}
          onPress={() => { props.setShowUploadForm(false) }}
        >
          <View style={styles.closeModal}>
            <Image style={{ width: 20, height: 20 }} source={require('../assets/images/close.png')} />
          </View>
        </TouchableOpacity>

        <View style={styles.formWrapper}>
          <Text style={{ fontSize: 25, marginBottom: 10, fontWeight: "bold", alignSelf: 'center' }}> Upload Lost Item </Text>
          <View style={{ width: '100%', marginBottom: 10 }} >
            <Text style={{ marginBottom: 5 }}>What is the Item</Text>
            <TextInput style={formStyles.input} />
          </View>
          <View style={{ width: '100%', marginBottom: 10 }} >
            <Text style={{ marginBottom: 5 }}>Where did you find it</Text>
            <TextInput style={formStyles.input} />
          </View>
          <View style={{ width: '100%', marginBottom: 20 }} >
            <Text style={{ marginBottom: 5, textAlign: 'center' }}>Add a picture of the item (landscape)</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { pickImage() }} >
                <View style={styles.smallButton} >
                  <Text style={{ color: "white", fontWeight: "900" }} >Select Photo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { captureImage() }} >
                <View style={[styles.smallButton, { marginLeft: 20 }]} >
                  <Text style={{ color: "white", fontWeight: "900" }} >Take Photo</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {image && <Image source={{ uri: image }} style={styles.uploadImage} />}
          <TouchableOpacity >
            <View style={formStyles.button} >
              <Text style={{ color: "white", fontWeight: "bold" }} >Upload</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  formWrapper: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeModal: {
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
