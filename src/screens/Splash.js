import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const Splash = ({ navigation }) => {
  useEffect(()=>{
    async function authenticate(){
      const result=await LocalAuthentication.authenticateAsync();
    }
    authenticate();
  },[]);
  useEffect(() => {
    // Navigate to the next screen after 5 seconds
    const timer = setTimeout(() => {
      navigation.navigate('IntroScreen');
    }, 10000);

    // Clear the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/splash.json')} // Replace with the path to your Lottie animation file
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
