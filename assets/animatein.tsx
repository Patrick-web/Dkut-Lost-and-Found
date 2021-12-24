import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function AnimatableFadeItems() {
  return (
    <ScrollView>
      {data.map((item, i) => (
        <Animatable.View
          key={item}
          style={styles.item}
          animation="fadeInUp"
          delay={i * 100}
          useNativeDriver
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 80,
    backgroundColor: 'indigo',
    marginVertical: 2,
  },
});

