import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTPScreen({navigation,route}) {
  const [otp, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const id=route.params.paramKey
  console.log(id)
  const [userToken,setUserToken] = useState('')
  async function retrieveUserToken() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        //console.log('User token retrieved successfully:', token);
        setUserToken(token);
      }
    } catch (error) {
      //console.log('Error retrieving user token:', error);
    }
  };
  useEffect(()=>{
    retrieveUserToken();
    //console.log(userToken);
  })
  useEffect(()=>{
    const timer=setTimeout(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);
  
    var raw = "";
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    async function fetchData(){
      await fetch(`https://ez-rupi.onrender.com/api/beneficiary/verification-code/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => (setOTP(result.verificationCode)))
      .catch(error => console.log('error', error));
    }
    fetchData();},5000);
    return () => clearTimeout(timer);
    
  });
  useEffect(() => {
    // Simulate delay of 1 minute
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Verified',{paramKey:id});
    }, 15000);

    return () => clearTimeout(timer);
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Verification Code Generating...</Text>
      </View>
    );
  }

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
    color: '#0E1D61',
    textAlign: 'center',
  },
  otpText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0E1D61',
    textAlign: 'center',
  },
});
