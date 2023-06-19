import React, { useState,useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DOMAIN_DATA = [
  { id: 1, title: 'Agriculture', image: require('../assets/agriculture.png') },
  { id: 2, title: 'Education', image: require('../assets/education.png') },
  { id: 3, title: 'Housing', image: require('../assets/housing.png') },
  { id: 4, title: 'Food', image: require('../assets/food.png') },
  { id: 5, title: 'Telecom', image: require('../assets/telecommunication.png') },
  { id: 6, title: 'Transportation', image: require('../assets/transport.png') },
  { id: 7, title: 'Health', image: require('../assets/healthcare.png') },
  { id: 8, title: 'Utility', image: require('../assets/utility.png') },
  { id: 9, title: 'Other', image: require('../assets/others.png') },
];
const DOMAIN_CARD_WIDTH = 110;
const screenWidth = Dimensions.get('window').width;
const numColumns = Math.floor(screenWidth / (DOMAIN_CARD_WIDTH + 35));

const Category = ({ navigation,route }) => {

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
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('TopTab',{paramKey:item.title})}
      style={[styles.card, { marginRight: 0.05 * screenWidth }]}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
    {
      data?<View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Search..." />
        <TouchableOpacity style={styles.profileIcon}>
          <Text style={styles.profileImage}>{data.name.charAt(0)}</Text>
          {/* <Image source={require('../assets/profile.png')} style={styles.profileImage} /> */}
        </TouchableOpacity>
      </View>
      <FlatList
        data={DOMAIN_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cardContainer}
        numColumns={3}
      />
    </View>:""
    }
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 0.02 * screenWidth,
    paddingHorizontal: 0.05 * screenWidth,
    marginTop:50,
  },
  searchInput: {
    flex: 1,
    height:50,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 0.03 * screenWidth,
  },
  profileIcon: {
    marginLeft: 0.04 * screenWidth,
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
  cardContainer: {
    paddingHorizontal: 0.03 * screenWidth,
    paddingTop: 0.04 * screenWidth,
  },
  card: {
    width: DOMAIN_CARD_WIDTH,
    marginBottom: 0.04 * screenWidth,
    alignItems: 'center',
    padding: 10,
  },
  cardImage: {
    width: DOMAIN_CARD_WIDTH,
    height: DOMAIN_CARD_WIDTH,
    borderRadius: DOMAIN_CARD_WIDTH / 2,
    marginBottom: 0.02 * screenWidth,
  },
  cardTitle: {
    fontSize: 12,
    //textAlign: 'center',
    fontWeight:'bold',
    color: 'black',
  },
});

export default Category;
