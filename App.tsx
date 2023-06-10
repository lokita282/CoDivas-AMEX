// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change the
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });


import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import All from './src/screens/All'
import Register from './src/screens/Register';
import Category from './src/screens/Category';
import BottomTab from './src/screens/BottomTab';
import Coupons from './src/screens/Coupons';
import Expired from './src/screens/Expired';
import NotRedeemed from './src/screens/NotRedeemed';
import Redeem from './src/screens/Redeem';
import Redeemed from './src/screens/Redeemed';
import TopTab from './src/screens/TopTab';
import TransactionHistory from './src/screens/TransactionHistory';
import GovernmentScheme from './src/screens/GovernementScheme';
import Otp from './src/screens/Otp';
import Verified from './src/screens/Verified';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="Category"
          component={Category}
          options={{headerShown:false}}/>
          <Stack.Screen 
          name="Coupons"
          component={Coupons}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="TopTab"
          component={TopTab}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="All"
          component={All}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="Redeemed"
          component={Redeemed}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="Not Redeemed"
          component={NotRedeemed}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="Expired"
          component={Expired}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="Redeem"
          component={Redeem}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="TransactionHistory"
          component={TransactionHistory}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="GovernmentScheme"
          component={GovernmentScheme}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="BottomTab"
          component={BottomTab}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="Otp"
          component={Otp}
          options={{headerShown:false}}/>
         <Stack.Screen 
          name="Verified"
          component={Verified}
          options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;