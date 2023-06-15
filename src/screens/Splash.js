import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    // Navigate to the next screen after 5 seconds
    const timer = setTimeout(() => {
      navigation.navigate('IntroScreen');
    }, 3000);

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
