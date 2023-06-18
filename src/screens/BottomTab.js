// import React from 'react';
// import { View, StyleSheet, Image } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Category from './Category';
// import GovernmentScheme from './GovernementScheme';
// import TransactionHistory from './TransactionHistory';

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// const BottomTab = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarShowLabel: true,
//         tabBarActiveTintColor: 'white',
//         tabBarInactiveTintColor: 'white',
//         tabBarActiveBackgroundColor: '#324080',
//         tabBarStyle: {
//           position: 'absolute',
//           elevation: 0,
//           backgroundColor: '#375EC0',
//           height: 90,
//           ...styles.shadow,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Category"
//         component={Category}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <View>
//               <Image
//                 source={require('../assets/category.png')}
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   //tintColor:focused?'#e32f45':'#748c94'
//                 }}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Government Schemes"
//         component={GovernmentScheme}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <View>
//               <Image
//                 source={require('../assets/govt2.png')}
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                 }}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Transaction History"
//         component={TransactionHistory}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <View>
//               <Image
//                 source={require('../assets/invoice.png')}
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   //tintColor:focused?'#e32f45':'#748c94'
//                 }}
//               />
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomTab;

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#7F5DF0',
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 3,
//   },
// });

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Category from './Category';
import GovernmentScheme from './GovernementScheme';
import TransactionHistory from './TransactionHistory';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#375EC0',
        tabBarInactiveTintColor: '#748c94',
        tabBarActiveBackgroundColor: 'white',
        tabBarStyle: {
          position: 'absolute',
          elevation: 0,
          backgroundColor: 'white',
          height: 90,
          ...styles.shadow,
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let iconColor;
          if (route.name === 'Category') {
            iconSource = require('../assets/category.png');
            iconColor = focused ? '#375EC0' : '#748c94';
          } else if (route.name === 'Government Schemes') {
            iconSource = require('../assets/govt2.png');
            iconColor = focused ? '#375EC0' : '#748c94';
          } else if (route.name === 'Transaction History') {
            iconSource = require('../assets/invoice.png');
            iconColor = focused ? '#375EC0' : '#748c94';
          }

          return (
            <View>
              <Image
                source={iconSource}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: iconColor,
                }}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Category" component={Category} options={{ headerShown: false }} />
      <Tab.Screen
        name="Government Schemes"
        component={GovernmentScheme}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Transaction History"
        component={TransactionHistory}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
});
