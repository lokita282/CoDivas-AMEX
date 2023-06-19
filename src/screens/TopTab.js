import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image ,Dimensions} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import All from './All';
import Redeemed from './Redeemed';
import Expired from './Expired';
import NotRedeemed from './NotRedeemed';
import AsyncStorage from "@react-native-async-storage/async-storage";



const screenWidth = Dimensions.get("window").width;
const Tab = createMaterialTopTabNavigator();
const ProfileIcon = () => {
  const [data,setData]=useState(null);
  async function retrieveUserToken() {
    try {
      const user = await AsyncStorage.getItem('codivasUser');
      if (user !== null) {
        setData(JSON.parse(user));
      }
    } catch (error) {
      console.log('Error retrieving user token:', error);
    }
  }

  useEffect(() => {
    retrieveUserToken();
  }, []);
  return (
  <View style={styles.header1}>
    <TouchableOpacity style={styles.profileIcon}>
          <Text style={styles.profileImage}>{data && data.name.charAt(0)}</Text>
          {/* <Image source={require('../assets/profile.png')} style={styles.profileImage} /> */}
        </TouchableOpacity>
  </View>)
};
const CustomTabBar = ({ state, descriptors, navigation ,title}) => {

  
  return (
    <View style={styles.container}>
    <View>
        <ProfileIcon />
    </View>
    <Text style={styles.header}>{title}</Text>
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const handlePress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={handlePress}
            style={[
              styles.tabItem,
              {
                backgroundColor: isFocused ? '#375EC0' : '#ffffff',
                borderRadius: index === 0 ? 50 : 50,
                //borderTopRightRadius: index === state.routes.length - 16 ? 16 : 16,
              },
            ]}
          >
            <Text style={[styles.tabLabel,{color: isFocused ? '#ffffff' : '#375EC0'}]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
    </View>
  );
};

const TabScreen1 = () => <View style={styles.screenContainer}><Text>Tab 1 Content</Text></View>;
const TabScreen2 = () => <View style={styles.screenContainer}><Text>Tab 2 Content</Text></View>;
const TabScreen3 = () => <View style={styles.screenContainer}><Text>Tab 3 Content</Text></View>;
const TabScreen4 = () => <View style={styles.screenContainer}><Text>Tab 4 Content</Text></View>;

const TopTab = ({navigation,route}) => {


  const title=route.params.paramKey;
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} title={title} />}>
      <Tab.Screen name="Upcoming">
        {() => <All title={title} />}
      </Tab.Screen>
      <Tab.Screen name="Redeemed">
        {() => <Redeemed title={title} />}
      </Tab.Screen>
      <Tab.Screen name="Pending">
        {() => <NotRedeemed title={title} />}
      </Tab.Screen>
      <Tab.Screen name="Expired">
        {() => <Expired title={title} />}
      </Tab.Screen>
      {/* <Tab.Screen name="All" component={() => <All title={title} />} />
      <Tab.Screen name="Redeemed" component={Redeemed} />
      <Tab.Screen name="Pending" component={NotRedeemed} />
      <Tab.Screen name="Expired" component={Expired} /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    width:370,
    alignSelf:'center',
    borderRadius:50,
    marginBottom:10,
    alignItems:'center',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
    justifyContent:'center',
    alignSelf:'center',
    textAlign:'center'
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    marginLeft: 330,
    marginTop:40,
  },
profileImage: {
  width: 0.13 * screenWidth,
  height: 0.13 * screenWidth,
  borderRadius: 0.04 * screenWidth,
  backgroundColor:'#0E1D61',
  borderRadius:50,
  color:'white',
  textAlign:'center',
  fontSize:30,
  padding:5,

},
  header:{
    color:'#375EC0',
    fontSize:20,
    fontWeight:'bold',
    margin:20
  },
  header1:{
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 0.02 * screenWidth,
      paddingHorizontal: 0.05 * screenWidth,
      marginTop:50,
    },
  }
});

export default TopTab;


// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import All from './All';
// import Redeemed from './Redeemed';
// import Expired from './Expired';
// import NotRedeemed from './NotRedeemed';

// const Tab = createMaterialTopTabNavigator();
// const ProfileIcon = () => {
//   return <Image source={require('../assets/profile.png')} style={styles.profileIcon} />;
// };

// const TopTab = ({ navigation, route }) => {
//   const title = route.params.paramKey;
//   return (
//     <View style={styles.container}>
//       <View style={styles.profileContainer}>
//         <ProfileIcon />
//       </View>
//       <Text style={styles.header}>{title}</Text>
//       <Tab.Navigator
//        screenOptions={{
//         tabBarStyle: {
//           height: 45,
//           borderRadius: 30,
//           width: '98%',
//           alignSelf: 'center',
//           backgroundColor: 'white',
//           justifyContent: 'center',
//         },
//         tabBarIndicatorStyle: {
//           backgroundColor: '#375EC0',
//           height: 40,
//           width: '25.33%',
//           borderRadius: 30,
//           margin: 2.5,
//           marginRight: 3,
//         },
//         tabBarLabelStyle:{
//           fontSize:11,
//           color:'black',
//         },
  
//       }}
//       >

// <Tab.Screen
//         name={'All'}
//         component={All}
//         initialParams={{title:title}}
//       />
//       <Tab.Screen
//         name={'Redeemed'}
//         component={Redeemed}
//         initialParams={{title:title}}
//       />
//       <Tab.Screen
//         name={'Pending'}
//         component={NotRedeemed}
//         initialParams={{title:title}}
//       />
//       <Tab.Screen
//         name={'Expired'}
//         component={Expired}
//         initialParams={{title:title}}
//       />
//       </Tab.Navigator>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   profileContainer: {
//     alignItems: 'flex-end',
//     margin: 10,
//   },
//   profileIcon: {
//     width: 50,
//     height: 50,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     margin: 20,
//     color: '#375EC0',
//   },
//   tabContainer: {
//     backgroundColor: '#FFF',
//     borderRadius: 50,
//     marginBottom: 10,
//     width: 370,
//     alignSelf: 'center',
//   },
//   tabItem: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 50,
//   },
//   tabLabel: {
//     fontSize: 11,
//     fontWeight: 'bold',
//   },
//   tabIndicator: {
//     backgroundColor: '#375EC0',
//     borderRadius: 50,
//   },
// });

// export default TopTab;