import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

export default function Verified({navigation,route}) {
  const [isVerified, setIsVerified] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const status=route.params.paramKey;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('BottomTab');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {status ? (
        <View style={styles.container}>
        <LottieView
          source={require('../assets/verified.json')}
          autoPlay
          loop
        />
        <Text style={styles.label}>Redemption successful.</Text></View>
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
    color:'#375EC0',
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
  verified: {
    width: 200,
    height: 200,
  },
  label:{
    marginTop:200,
    fontSize:20,
    color:'gray',
    fontWeight:'bold'
  }
});
