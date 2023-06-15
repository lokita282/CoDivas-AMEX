import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const GovernmentScheme = () => {

  const [searchText, setSearchText] = useState('');
  const [governmentSchemes, setGovernmentSchemes] = useState([
    'Smart Cities Mission Portal by Ministry of Urban Development.',
    'Guidelines for Integrated Development of Commercial Floriculture Scheme.',
    'Social defence schemes of Ministry of Social Justice and Empowerment.',
    'Schemes and programmes for differently abled by Ministry of Social Justice and Empowerment.',
    'National Rural Employment Guarantee Scheme by Ministry of Rural Development',
    'Pradhan Mantri Awas Yojana (Housing for All) by Ministry of Housing and Urban Affairs',
    'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) by Ministry of Agriculture and Farmers Welfare',
    'Beti Bachao Beti Padhao (Save the Girl Child, Educate the Girl Child) by Ministry of Women and Child Development',
    'Digital India Initiative by Ministry of Electronics and Information Technology',
    'Ayushman Bharat (Pradhan Mantri Jan Arogya Yojana) by Ministry of Health and Family Welfare',
    'Pradhan Mantri Matru Vandana Yojana by Ministry of Women and Child Development',
  ]);

  const renderGovernmentSchemes = () => {
    return governmentSchemes.map((scheme, index) => (
      <View style={styles.card} key={index}>
        <Image source={require('../assets/indian.png')} style={styles.logo} />
        <Text style={styles.info}>{scheme}</Text>
      </View>
    ));
  };



  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Search..." />
        <TouchableOpacity style={styles.profileIcon}>
          <Image source={require('../assets/profile.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.schemesContainer}>{renderGovernmentSchemes()}</View>
    </View>
    </ScrollView>
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
    paddingHorizontal: 0.04 * screenWidth,
    marginTop:50,
  },
  searchInput: {
    flex: 1,
    height: 0.09 * screenWidth,
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
  },
  title: {
    fontSize: 0.06 * screenWidth,
    fontWeight: 'bold',
    marginTop: 0.04 * screenWidth,
  },
  searchBar: {
    marginTop: 0.02 * screenWidth,
    padding: 0.02 * screenWidth,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 0.02 * screenWidth,
  },
  schemesContainer: {
    marginTop: 0.04 * screenWidth,
    padding: 0.04 * screenWidth,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0.04 * screenWidth,
    borderWidth: 1,
    width: 0.9 * screenWidth,
    borderColor: 'gray',
    borderRadius: 0.02 * screenWidth,
    marginVertical: 0.02 * screenWidth,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode:'contain'
  },
  info:{
    marginLeft:5,
    marginRight:15,
  }
});

export default GovernmentScheme;
