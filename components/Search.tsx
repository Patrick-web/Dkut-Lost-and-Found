import { useState } from 'react'
import { TextInput, View, Image, StyleSheet, Pressable } from 'react-native'
import Fuse from 'fuse.js';
import { LostItem } from '../types';

const SearchBar = ({ items, filterhandler, clearSearch }: { items: LostItem[], filterhandler: (items: any) => any, clearSearch: () => void }) => {
  const [hideSearchIcon, setHideSearchIcon] = useState(false)
  const [leftPadding, setLeftPadding] = useState(40)
  const [searchPattern, setSearchPattern] = useState('');
  const fuse = new Fuse(items, { isCaseSensitive: false, keys: ['title', 'location'] })

  async function search(text: string) {
    setSearchPattern(text)
    if (text === '') {
      clearSearch()
    } else {
      const result = fuse.search(searchPattern)
      filterhandler(result)
    }
  }


  return (
    <View style={styles.bar}>
      {!hideSearchIcon && <Image style={styles.searchIcon} source={require('../assets/images/search.png')} />}
      {searchPattern !== '' &&
        <Pressable style={styles.cancelSearch} onPress={() => { setSearchPattern(''); clearSearch() }}>
          <Image style={{ opacity: 0.4, width: 20, height: 20 }} source={require('../assets/images/close.png')} />
        </Pressable>
      }
      <TextInput value={searchPattern} onChangeText={(text) => search(text)} onFocus={() => { setHideSearchIcon(true); setLeftPadding(10) }} onBlur={() => { setHideSearchIcon(false); setLeftPadding(40) }} placeholder="Search" style={{ paddingVertical: 5, width: "100%", borderColor: 'grey', borderWidth: 1, paddingLeft: leftPadding, borderRadius: 30 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
  searchIcon: {
    width: 15,
    height: 15,
    position: 'absolute',
    top: 22,
    left: 25,
    opacity: 0.4,
  },
  cancelSearch: {
    zIndex: 3,
    backgroundColor: 'white',
    elevation: 2,
    position: 'absolute',
    top: 14,
    right: 15,
    borderRadius: 20,
    padding: 5,
  },
})

export default SearchBar;
