import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OTPScreen({navigation}) {
  const [otp, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate delay of 1 minute
    const timer = setTimeout(() => {
      // Generate OTP (here, we're using a static value)
      const generatedOTP = '123456';

      setOTP(generatedOTP);
      setIsLoading(false);
    }, 15000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Verified');
    }, 30000);

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
