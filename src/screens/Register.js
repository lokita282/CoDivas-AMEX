import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import LottieView from "lottie-react-native";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [aadhar, setAadhar] = useState("");

  const submitPressed = () => {
    // handle form submission logic here
    //alert('Registration successful');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      aadhar: aadhar,
      pan: "AAACU2254N",
      name: name,
      phone: number,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://ez-rupi.onrender.com/api/auth/beneficiary/signup",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.lottie}>
            <LottieView
              source={require("../assets/login.json")} // Replace with the path to your Lottie animation file
              autoPlay
              loop
            />
          </View>
          <Text style={styles.header}>Good to see you</Text>

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
          {/* <View style={styles.btnContainer}>
            <Button
              title="Register"
              onPress={() => {
                submitPressed();
                navigation.navigate("BottomTab");
              }}
              color="white"
            />
          </View> */}
         
          <TouchableOpacity onPress={() => submitPressed()} style={styles.btnContainer} >
            <Text style={styles.btn}>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.registerText}>
              Already have an account ? <Text style={styles.link}>Signin</Text>
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
    padding: 7,
  },
  lottie: {
    flex: 1,
    padding: 5,
  },
  scrollViewContainer: {
    flexGrow: 1,
    //justifyContent: 'center',
    padding: 16,
    paddingBottom: 100,
  },
  logoContainer: {
    alignItems: "flex-start",
    //marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  header: {
    fontSize: 24,
    //paddingVertical: 10,
    textAlign: "left",
    color: "black",
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#375EC0',
    marginBottom: 30
  },
  inputTextWrapper: {
    marginBottom: 24,
  },
  textInput: {
    height: 50,
    borderColor: "#B0B0B0",
    borderWidth: 1,
    paddingRight: 30,
    paddingLeft: 10,
    borderRadius: 5,
  },
  btnContainer: {
    borderColor: '#375EC0',
    borderWidth: 2,
    marginTop: 36,
    borderRadius: 150,
    height:48,
    color:'#375EC0',
  },
  registerText: {
    marginBottom: 20,
    marginTop:20,
    textAlign: "left",
    color: "black",
    fontSize: 18,
    fontStyle: "normal",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 35,
    height: 35,
    marginHorizontal: 10,
  },
  social: {
    fontSize: 17,
    fontStyle: "normal",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  link: {
    color: "#375EC0",
    textDecorationLine: "underline",
  },
  btn: {
    borderRadius: 150,
    color:'#375EC0',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    padding: 10,
    fontSize:20, 
    fontWeight:'bold'
  }
});
