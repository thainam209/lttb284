import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/groceries.png')} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleLine1}>Get your groceries</Text>
        <Text style={styles.titleLine2}>with nectar</Text>
      </View>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => navigation.navigate('Number')}
      >
        <Text style={styles.prefix}>🇧🇩 +880</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          editable={false}
        />
      </TouchableOpacity>
      <Text style={styles.socialText}>Or connect with social media</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4285F4' }]}>
        <Icon name="google" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#3B5998' }]}>
        <Icon name="facebook" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: 20,
    textAlign: 'left',
  },
  titleLine1: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  titleLine2: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    width: '90%',
    backgroundColor: '#fff',
  },
  prefix: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  socialText: {
    fontSize: 16,
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    width: '90%',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});
