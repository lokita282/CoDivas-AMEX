import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const DOMAIN_DATA = [
  { id: 1, title: 'Agriculture', image: require('../assets/agriculture.png') },
  { id: 2, title: 'Education', image: require('../assets/education.png') },
  { id: 3, title: 'Housing', image: require('../assets/housing.png') },
  { id: 4, title: 'Food', image: require('../assets/food.png') },
  { id: 5, title: 'Energy', image: require('../assets/energy.png') },
  { id: 6, title: 'Transport', image: require('../assets/transport.png') },
  { id: 7, title: 'Healthcare', image: require('../assets/healthcare.png') },
];

const DOMAIN_CARD_WIDTH = 100;

const Category = ({navigation}) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() =>
      navigation.navigate('TopTab')}style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Search..." />
        <TouchableOpacity style={styles.profileIcon}>
          <Image source={require('../assets/profile.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={DOMAIN_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cardContainer}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#ffffff',
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
  cardContainer: {
    paddingHorizontal: 15,
    paddingTop: 16,
  },
  card: {
    width: DOMAIN_CARD_WIDTH,
    marginBottom: 20,
    marginRight: 35,
    alignItems: 'center',
    padding:10,
    //backgroundColor:'white'
  },
  cardImage: {
    width: DOMAIN_CARD_WIDTH,
    height: DOMAIN_CARD_WIDTH,
    borderRadius: DOMAIN_CARD_WIDTH / 2,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black'
  },
});

export default Category;
