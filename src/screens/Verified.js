import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Verified({navigation}) {
  const [isVerified, setIsVerified] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate delay of 5 seconds
    const timer = setTimeout(() => {
      // Simulate verification status (true for verified, false for not verified)
      const verificationStatus = Math.random() < 0.5 ? true : false;

      setIsVerified(verificationStatus);
      setIsLoading(false);
    }, 5000);

    // Clear the timer if the component is unmounted
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
        <Text style={styles.loadingText}>Checking Verification Status...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isVerified ? (
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
