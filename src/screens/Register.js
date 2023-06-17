import React, { useState } from 'react';
import { Button, StyleSheet, Text,Image, TextInput,TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [aadhar, setAadhar] = useState('');

  const submitPressed = () => {
    // handle form submission logic here
    //alert('Registration successful');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "aadhar": aadhar,
      "pan": "AAACU2254N",
      "name": name,
      "phone": number,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://ez-rupi.onrender.com/api/auth/beneficiary/signup", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>
          <Text style={styles.header}>Register</Text>
          <View style={styles.inputTextWrapper}>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputTextWrapper}>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.inputTextWrapper}>
            <TextInput
              placeholder="Name"
              style={styles.textInput}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputTextWrapper}>
            <TextInput
              placeholder="Mobile Number"
              style={styles.textInput}
              value={number}
              keyboardType="numeric"
              onChangeText={(text) => setNumber(text)}
            />
          </View>
          <View style={styles.inputTextWrapper}>
            <TextInput
              placeholder="Aadhar number"
              style={styles.textInput}
              value={aadhar}
              keyboardType="numeric"
              onChangeText={(text) => setAadhar(text)}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="Register"
              onPress={() => {submitPressed(); navigation.navigate('BottomTab')}}
              color="white"
            />
          </View>
          <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
          <Text style={styles.registerText}>
        Already have an account ?{' '}
        <Text style={styles.link}>Login</Text>
      </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:7,
  },
  lottie: {
    padding:40,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 36,
    paddingVertical: 24,
    textAlign: 'center',
    color: 'black',
  },
  inputTextWrapper: {
    marginBottom: 24,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    paddingRight: 30,
    paddingLeft:10,
  },
  btnContainer: {
    backgroundColor: '#0E1D61',
    marginTop: 36,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode:'contain'
  },
  registerText: {
    marginTop: 40,
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontStyle:'normal',
  },
  link: {
    color: '#0E1D61',
    textDecorationLine: 'underline',
  },
});
