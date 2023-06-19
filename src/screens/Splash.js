// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet,Image, Text } from 'react-native';
// import LottieView from 'lottie-react-native';
// import * as LocalAuthentication from 'expo-local-authentication';


// const Splash = ({ navigation }) => {
//   const [result, setResult] = useState(false)
//   useEffect(()=>{
//     setResult(false)
//     async function authenticate(){
//       const result=await LocalAuthentication.authenticateAsync();
//       setResult(result.success)
//     }
//     authenticate();
//   },[]);
//   useEffect(() => {
//     // Navigate to the next screen after 5 seconds
//     const timer = setTimeout(() => {
//       navigation.navigate('IntroScreen');
//     }, 7000);

//     // Clear the timer when the component is unmounted
//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <>
//     {result ?  <View style={styles.container}>
//       {/* <LottieView
//         source={require('../assets/splash.json')} // Replace with the path to your Lottie animation file
//         autoPlay
//         loop
//       /> */}
//       <Image style={{ width:200, height:150}} source={require('../assets/first.gif')} />
//       <Text style={{fontWeight:'bold', fontSize:28}}>Scan. Verify. Redeem.</Text>
//       <Text style={{color:'#8D8D8D'}}>Just one scan away</Text>
//     </View> : <View/>}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Splash;


import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const Splash = ({ navigation }) => {
  const [authenticationResult, setAuthenticationResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    async function authenticate() {
      try {
        const result = await LocalAuthentication.authenticateAsync();
        setAuthenticationResult(result.success);
      } catch (error) {
        console.log('Authentication error:', error);
        setAuthenticationResult(false);
      } finally {
        setIsLoading(false);
      }
    }

    authenticate();
  }, []);

  useEffect(() => {
    if (!isLoading && authenticationResult) {
      // Navigate to the next screen after successful authentication
      const timer = setTimeout(() => {
        navigation.navigate('IntroScreen');
      }, 7000);

      // Clear the timer when the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [isLoading, authenticationResult, navigation]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LottieView
          source={require('../assets/splash.json')}
          autoPlay
          loop
        />
      ) : (
        <>
          {authenticationResult ? (
            <>
              <Image style={{ width: 200, height: 150 }} source={require('../assets/first.gif')} />
              <Text style={{ fontWeight: 'bold', fontSize: 28 }}>Scan. Verify. Redeem.</Text>
              <Text style={{ color: '#8D8D8D' }}>Just one scan away</Text>
            </>
          ) : (
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Authentication failed. Please try again.</Text>
          )}
        </>
      )}
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
