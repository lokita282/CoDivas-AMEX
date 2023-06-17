import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [tok,setTok]=useState('')

  const storeUserToken = async (token) => {
    try {
      await AsyncStorage.setItem('userToken',token);
      console.log('User token stored successfully!',token);
    } catch (error) {
      console.log('Error storing user token:', error);
    }
    navigation.navigate('BottomTab')
  };
  
  const submitPressed = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "phone": number,
    "password": password
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    async function fetchData(){
      await fetch("https://ez-rupi.onrender.com/api/auth/login", requestOptions)
      .then(response => response.json())
      .then(result => storeUserToken(result.token))
      .catch(error => console.log('error', error));
    }
    fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>
          <View style={styles.lottie}>
      <LottieView
        source={require('../assets/login.json')} // Replace with the path to your Lottie animation file
        autoPlay
        loop
      />
    </View>
          <Text style={styles.header}>Login</Text>
          <View style={styles.inputTextWrapper}>
            <TextInput
              placeholder="Phone Number"
              style={styles.textInput}
              value={number}
              keyboardType="numeric"
              onChangeText={(text) => setNumber(text)}
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
          <View style={styles.btnContainer}>
            <Button
              title="Login"
              onPress={() => {submitPressed()}}
              color="#fff"
            />
          </View>
          <TouchableOpacity onPress={() => {navigation.navigate('Register')}}>
          <Text style={styles.registerText}>
        Don't have an account?{' '}
        <Text style={styles.link}>Signup</Text>
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
    flex: 1,
    padding:5,
  },
  scrollViewContainer: {
    flexGrow: 1,
    //justifyContent: 'center',
    padding: 16,
    paddingBottom: 100,
  },
  logoContainer: {
    alignItems: 'flex-start',
    //marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode:'contain'
  },
  header: {
    fontSize: 36,
    //paddingVertical: 10,
    textAlign: 'center',
    color: 'black',
    marginBottom:10,
  },
  inputTextWrapper: {
    marginBottom: 24,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingRight: 30,
    paddingLeft: 10,
  },
  btnContainer: {
    backgroundColor: '#0E1D61',
    marginTop: 36,
  },
  registerText: {
    marginTop: 40,
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontStyle:'normal',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 35,
    height: 35,
    marginHorizontal: 10,
  },
  social: {
    fontSize: 17,
    fontStyle:'normal',
    textAlign:'center',
    marginTop:30,
    marginBottom: 20,
  },
  link: {
    color: '#0E1D61',
    textDecorationLine: 'underline',
  },
});

