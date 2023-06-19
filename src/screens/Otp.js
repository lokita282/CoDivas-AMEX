import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Image,Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

export default function OTPScreen({navigation,route}) {
  //const [otp, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const id=route.params.paramKey;
  const otp=route.params.code;
  const userToken=route.params.token;
  const bank=route.params.bankLogo;
  const org=route.params.orgLogo;
  console.log(id)
  
  useEffect(() => {
    console.log(userToken);
    const fetchData = async () => {
      var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userToken}`);
  
        var raw = "";
  
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
      try {
        const response = await fetch(
          `https://ez-rupi.onrender.com/api/beneficiary/redeemed/${id}`,
          requestOptions
        );
        const result = await response.json();
        console.log(result);
        if (result.redeemed) {
            navigation.navigate("Verified",{paramKey:true});
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();

    const startFetchingData = async () => {
      await fetchData();
      interval = setInterval(async () => {
        await fetchData();
      }, 2000);
    };
    startFetchingData();
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
          source={require('../assets/otp2.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      <Text style={styles.liner}>Your verification code is :</Text>
      <Text style={styles.otpText}>{otp}</Text>

      {/* <Text style={styles.otpText}>{otp}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie:{
    width:200,
    height:200,

  },
  container1: {
    backgroundColor:'white',
  },
  loadingText: {
    fontSize: 20,
    color: '#375EC0',
    textAlign: 'center',
  },
  otpText: {
    fontSize: 70,
    fontWeight: '700',
    color: '#4A4A4A',
    textAlign: 'center',
  },
  liner: {
    fontSize: 20,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent:'space-between',
    marginBottom: 16,
    marginTop: 13,
    padding:30,
    width:screenWidth,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
