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
    <View style={styles.profileIconContainer}>
              <TouchableOpacity style={styles.profileIcon}>
                <Text style={styles.profileImage}>{data && data.name.charAt(0)}</Text>
              </TouchableOpacity>
            </View>
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
      <Tab.Screen name="Available">
        {() => <NotRedeemed title={title} />}
      </Tab.Screen>
      <Tab.Screen name="Expired">
        {() => <Expired title={title} />}
      </Tab.Screen>
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
  profileIconContainer: {
    marginLeft: 0.82 * screenWidth,
    marginTop: 0.095 * screenWidth,
    overflow: "hidden",
  },
  profileIcon: {
    width: 0.13 * screenWidth,
    height: 0.13 * screenWidth,
    borderRadius: 0.065 * screenWidth,
    backgroundColor: "#0E1D61",
    color: "white",
    //textAlign: "center",
    fontSize: 30,
    padding: 5,
    overflow:"hidden",
  },
  profileImage: {
    width: 0.13 * screenWidth,
    height: 0.13 * screenWidth,
    backgroundColor: "#0E1D61",
    color: "white",
    fontSize: 30,
    padding: 5,
    marginLeft:Platform.OS === "android" ? 0.015 * screenWidth : 0.017 * screenWidth,
    marginTop:Platform.OS === "android" ? -5: -2,
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