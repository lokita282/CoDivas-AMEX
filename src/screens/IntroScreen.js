import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
const IntroScreen = ({navigation}) => {

    useEffect(() => {
        // Navigate to the next screen after 5 seconds
        const timer = setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
    
        // Clear the timer when the component is unmounted
        return () => clearTimeout(timer);
      }, [navigation]);

    return (
      <View style={styles.container}>
        <LottieView
        source={require('../assets/sparkle.json')} // Replace with the path to your Lottie animation file
        autoPlay
        loop
      />
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.tagline}>Empowering Seamless Transactions, the eZ-RUPI Way!</Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding:50
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode:'contain'
    },
    tagline: {
      marginTop: 20,
      textAlign:'center',
      fontStyle:'normal',
      color:'#000000',
      fontSize:18
    },
  });

  export default IntroScreen;