import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import All from './All';
import Redeemed from './Redeemed';
import Expired from './Expired';
import NotRedeemed from './NotRedeemed';

const Tab = createMaterialTopTabNavigator();
const ProfileIcon = () => {
  return <Image source={require('../assets/profile.png')} style={styles.profileIcon} />;
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
                backgroundColor: isFocused ? '#0E1D61' : '#ffffff',
                borderRadius: index === 0 ? 50 : 50,
                //borderTopRightRadius: index === state.routes.length - 16 ? 16 : 16,
              },
            ]}
          >
            <Text style={[styles.tabLabel,{color: isFocused ? '#ffffff' : '#0E1D61'}]}>{label}</Text>
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
      <Tab.Screen name="All">
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
    width: 50,
    height: 50,
    marginLeft:330,
    marginTop:50,
  },
  header:{
    color:'#0E1D61',
    fontSize:20,
    fontWeight:'bold',
    margin:20
  }
});

export default TopTab;


// export default TopTab