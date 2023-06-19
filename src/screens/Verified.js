import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
});
