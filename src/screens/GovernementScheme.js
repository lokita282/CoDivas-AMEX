import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

const GovernmentScheme = () => {
  const [searchText, setSearchText] = useState('');
  const [governmentSchemes, setGovernmentSchemes] = useState([
    'Smart Cities Mission Portal by Ministry of Urban Development',
    'Guidelines for Integrated Development of Commercial Floriculture Scheme',
    'Social defence schemes of Ministry of Social Justice and Empowerment',
    'Schemes and programmes for differently abled by Ministry of Social Justice and Empowerment'
  ]);

  const renderGovernmentSchemes = () => {
    return governmentSchemes.map((scheme, index) => (
      <View style={styles.card} key={index}>
        <Text>{scheme}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Search..." />
        <TouchableOpacity style={styles.profileIcon}>
          <Image source={require('../assets/profile.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.schemesContainer}>{renderGovernmentSchemes()}</View>
    </View>
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
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  profileIcon: {
    marginLeft: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  searchBar: {
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  schemesContainer: {
    marginTop: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    width:370,
    borderColor: 'gray',
    borderRadius: 4,
    margin: 8,
  },
});

export default GovernmentScheme;
