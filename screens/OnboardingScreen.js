import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';

export default function OnboardingScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Gilroy-SemiBold': require('../assets/fonts/Gilroy-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            source={require('../assets/images/carrot_logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>
            Welcome{'\n'}to our store
          </Text>
          <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    marginBottom: 50,
    paddingBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 48,
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: '600',
    lineHeight: 58,
    letterSpacing: 0,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 10,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Gilroy-SemiBold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 0,
  },
  button: {
    backgroundColor: '#53B175',
    paddingVertical: 18,
    paddingHorizontal: 100,
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
    color: '#fff',
  },
});