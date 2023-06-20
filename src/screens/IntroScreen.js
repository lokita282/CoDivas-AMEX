import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';


const IntroScreen = ({navigation}) => {

    useEffect(() => {
        // Navigate to the next screen after 5 seconds
        const timer = setTimeout(() => {
          navigation.replace('Login');
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
        <Image source={require('../assets/logo.gif')} style={styles.logo} />
        <Text style={styles.tagline}>Empowering Seamless Transactions,{"\n"}the eZ-RUPI Way!</Text>
      
              <Text style={{color:'grey',fontSize:15}}>Developed By</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 28,color: '#000' }}>CoDivas</Text>
            
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode:'contain',
      marginTop:70,
    },
    tagline: {
      marginTop: 20,
      textAlign:'center',
      fontStyle:'normal',
      color:'#000000',
      fontSize:18,
      marginBottom:180,
    },
  });

  export default IntroScreen;