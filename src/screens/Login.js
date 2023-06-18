import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false)
  const [aadhar, setAadhar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [tok, setTok] = useState("");

  const storeUserToken = async (res) => {
    try {
      console.log(res)
      let token = res.token
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("codivasUser", JSON.stringify(res.user));
setLoading(false)
      console.log("User token stored successfully!", res.token);
      console.log(await AsyncStorage.getItem("codivasUser"))
    } catch (error) {
      console.log("Error storing user token:", error);
    }
    navigation.navigate("BottomTab");
  };

  const submitPressed = () => {
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      phone: number,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    async function fetchData() {
      await fetch("https://ez-rupi.onrender.com/api/auth/login", requestOptions)
        .then((response) => response.json())
        .then((result) => storeUserToken(result))
        .catch((error) => console.log("error", error));
    }
    fetchData();
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
          <Text style={styles.header}>Welcome Back!</Text>
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
          
          {/* <Button
              title="Login"
              onPress={() => {
                submitPressed();
              }}
              color="#375EC0"
              style={styles.btn}
            /> */}
          {loading ? <View style={{flex:0.01, justifyContent:'center', left:160}}>

          <LottieView
              source={require("../assets/load.json")} 
              autoPlay
              loop
              style={{height:50}}
            /></View> : <TouchableOpacity onPress={() => submitPressed()} style={styles.btnContainer} >
            <Text style={styles.btn}>Login</Text>
          </TouchableOpacity>}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={styles.registerText}>
              Don't have an account? <Text style={styles.link}>Sign Up</Text>
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
    fontWeight:'bold'
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
