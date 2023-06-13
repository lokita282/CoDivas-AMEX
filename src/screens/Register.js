import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native';

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
              color="#0E1D61"
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
