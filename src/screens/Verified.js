import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Verified({navigation,route}) {
  const [isVerified, setIsVerified] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(true);
  const id=route.params.paramKey
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
      await fetch(`https://ez-rupi.onrender.com/api/beneficiary/redeemed//${id}`, requestOptions)
      .then(response => response.json())
      .then(result => (cosnole.log(result)))
      .catch(error => console.log('error', error));
    }
    fetchData();},5000);
    return () => clearTimeout(timer);
    
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('BottomTab');
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigation]);
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Checking Redemption Status...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {status ? (
        <Text style={[styles.statusIcon, styles.greenTick]}>✓</Text>
      ) : (
        <Text style={[styles.statusIcon, styles.redCross]}>✕</Text>
      )}
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
    textAlign: 'center',
  },
  statusIcon: {
    fontSize: 100,
    textAlign: 'center',
    marginBottom: 20,
  },
  greenTick: {
    color: 'green',
  },
  redCross: {
    color: 'red',
  },
});
