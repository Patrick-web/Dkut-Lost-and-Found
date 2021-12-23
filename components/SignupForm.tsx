import { StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Text, View } from "react-native"

const SignupForm = () => {
  return (
    <View style={styles.form}>
      <View style={{ width: '100%', marginBottom: 20 }} >
        <Text style={styles.tlabel}>First Name</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={{ width: '100%', marginBottom: 20 }} >
        <Text style={styles.tlabel}>Second Name</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={{ width: '100%', marginBottom: 20 }} >
        <Text style={styles.tlabel}>Phone Number</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={{ width: '100%', marginBottom: 20 }} >
        <Text style={styles.tlabel}>Email</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={{ width: '100%', marginBottom: 20 }} >
        <Text style={styles.tlabel}>Pin</Text>
        <TextInput style={styles.input} />
      </View>
      <TouchableOpacity >
        <View style={styles.primaryButton} >
          <Text style={{ color: "white", fontWeight: "900" }} >Sign Up</Text>
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

export default SignupForm;
