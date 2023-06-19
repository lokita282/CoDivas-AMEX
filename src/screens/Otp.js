import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OTPScreen({navigation,route}) {
  //const [otp, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const id=route.params.paramKey;
  const otp=route.params.code;
  const userToken=route.params.token;
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
      <Text style={styles.otpText}>{otp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: '#375EC0',
    textAlign: 'center',
  },
  otpText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#375EC0',
    textAlign: 'center',
  },
});
