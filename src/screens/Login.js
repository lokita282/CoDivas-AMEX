import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [token, setToken] = useState('');

  const storeUserToken = async (token) => {
    try {
      await AsyncStorage.setItem('userToken',token);
      console.log('User token stored successfully!');
    } catch (error) {
      console.log('Error storing user token:', error);
    }
  };
  
  const submitPressed = () => {
    // handle form submission logic here
    //alert('Registration successful');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "phone": "9732065755",
    "password": "test1234"
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    async function fetchData(){
    fetch("https://ez-rupi.onrender.com/api/auth/login", requestOptions)
    .then(response => response.json())
    .then(result => (setToken(result.token)))
    .catch(error => console.log('error', error));}

    fetchData();
    storeUserToken(token);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.header}>Login</Text>
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
              onPress={() => {submitPressed(); navigation.navigate('BottomTab')}}
              color="#0E1D61"
              backgroundColor="red"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderBottomWidth: 1,
    paddingRight: 30,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 36,
  },
});
