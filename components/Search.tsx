import { TextInput, View, Image, StyleSheet } from 'react-native'

const SearchBar = () => {
  return (
    <View style={styles.bar}>
      <Image style={styles.icon} source={require('../assets/images/search.png')} />
      <TextInput placeholder="Search" style={styles.input} />
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    width: '93%',
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 20,
    left: 20,
    opacity: 0.7,
  },
  input: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 40,
    borderRadius: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: 'grey'
  }
})

export default SearchBar;
