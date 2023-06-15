import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
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
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode:'contain'
    },
    tagline: {
      fontSize: 24,
      marginTop: 20,
      textAlign:'center',
      padding:10,
      fontStyle:'italic'
    },
  });

  export default IntroScreen;