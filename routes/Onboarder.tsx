import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({ selected }: { selected: any }) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 10,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 3,
        backgroundColor
      }}
    />
  );
}

const Skip = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10 }}
    {...props}
  >
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20 }}
    {...props}
  >
    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 }}
    {...props}
  >
    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Fiti</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }: { navigation: any }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("Signup")}
      onDone={() => navigation.navigate("Signup")}
      pages={[
        {
          backgroundColor: '#F6ECD2',
          image: <Image source={require('../assets/images/handshake.png')} />,
          title: <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>Karibu Comrade</Text>,
          subtitle: 'To the Lost and Found Platform for DeKUT students.',
        },
        {
          backgroundColor: '#FFD7CD',
          image: <Image source={require('../assets/images/lostItems.png')} />,
          title: <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>Okolea Comrade</Text>,
          subtitle: 'everything, ID card, simu, laptop, notebook....EVERYTHING. Ukipata kitu comrade amepoteza post it',
        },
        {
          backgroundColor: '#F5C4AD',
          image: <Image source={require('../assets/images/searching.png')} />,
          title: <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>Ama umepoteza kitu</Text>,
          subtitle: "relaaax, open the app and check if someone has found it. If so, call them and set up an exchange. Simple.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
