import React, { useState,useEffect } from "react";
import { View, StyleSheet, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Category from './Category';
import GovernmentScheme from './GovernementScheme';
import TransactionHistory from './TransactionHistory';
import Dashboard from "./Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

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
        tabBarShowLabel: false,
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
          let iconName;
          let fontStyle;
          let fontSize;
          let fontWeight;

          let focusSetting = () => {
            fontSize = focused ? 13 : 12;
            fontWeight = focused ? "bold" : "";
          };
          if (route.name === 'Home') {
            iconSource = require('../assets/home.png');
            iconColor = focused ? '#375EC0' : '#748c94';
            iconName = "Home";
            focusSetting();
          } else if (route.name === 'Category') {
            iconSource = require('../assets/category.png');
            iconColor = focused ? '#375EC0' : '#748c94';
            iconName = "Category";
            focusSetting();
          } else if (route.name === 'Schemes') {
            iconSource = require('../assets/govt2.png');
            iconColor = focused ? '#375EC0' : '#748c94';
            iconName = "Schemes";
            focusSetting();
          } else if (route.name === 'Transactions') {
            iconSource = require('../assets/invoice.png');
            iconColor = focused ? '#375EC0' : '#748c94';
            iconName = "Transactions";
            focusSetting();
          }
          
          return (
            <View style={{ alignItems: "center" }}>
              <Image
                source={iconSource}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: iconColor,
                  marginBottom: 5,
                }}
              />
              <Text
                style={{
                  fontFamily: fontStyle,
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                  alignItems: "center",
                }}
              >
                {iconName}
              </Text>
            </View>
          );
        },
      })}
      listeners={{
        tabPress: Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Category" component={Category} options={{ headerShown: false }} />
      <Tab.Screen
        name="Schemes"
        component={GovernmentScheme}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Transactions"
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
