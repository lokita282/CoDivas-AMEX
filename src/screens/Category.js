import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

const DOMAIN_DATA = [
  { id: 1, title: 'Agriculture', image: require('../assets/agriculture.png') },
  { id: 2, title: 'Education', image: require('../assets/education.png') },
  { id: 3, title: 'Housing', image: require('../assets/housing.png') },
  { id: 4, title: 'Food', image: require('../assets/food.png') },
  { id: 5, title: 'Telecom', image: require('../assets/telecommunication.png') },
  { id: 6, title: 'Transport', image: require('../assets/transport.png') },
  { id: 7, title: 'Healthcare', image: require('../assets/healthcare.png') },
  { id: 8, title: 'Utility', image: require('../assets/utility.png') },
  { id: 9, title: 'Others', image: require('../assets/others.png') },
];

const DOMAIN_CARD_WIDTH = 100;
const screenWidth = Dimensions.get('window').width;
const numColumns = Math.floor(screenWidth / (DOMAIN_CARD_WIDTH + 35));

const Category = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('TopTab')}
      style={[styles.card, { marginRight: 0.05 * screenWidth }]}
    >
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
  cardContainer: {
    paddingHorizontal: 0.06 * screenWidth,
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
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default Category;
// import React, { useState, useEffect } from 'react';
// import { Button,View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
// import * as Localisation from 'expo-localization';
// import i18n from 'i18n-js';

// const DOMAIN_DATA = [
//   { id: 1, title: 'Agriculture', image: require('../assets/agriculture.png') },
//   { id: 2, title: 'Education', image: require('../assets/education.png') },
//   { id: 3, title: 'Housing', image: require('../assets/housing.png') },
//   { id: 4, title: 'Food', image: require('../assets/food.png') },
//   { id: 5, title: 'Telecom', image: require('../assets/telecommunication.png') },
//   { id: 6, title: 'Transport', image: require('../assets/transport.png') },
//   { id: 7, title: 'Healthcare', image: require('../assets/healthcare.png') },
//   { id: 8, title: 'Utility', image: require('../assets/utility.png') },
//   { id: 9, title: 'Others', image: require('../assets/others.png') },
// ];

// const DOMAIN_CARD_WIDTH = 100;
// const screenWidth = Dimensions.get('window').width;
// const numColumns = Math.floor(screenWidth / (DOMAIN_CARD_WIDTH + 35));
// import {en,hin} from '../localisation';


// const Category = ({ navigation }) => {
//   let [locale,setLocale]=useState(Localisation.locale);
//   i18n.fallbacks = useState(true);
//   i18n.translations={en,hin};
//   i18n.locale =locale;
//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => navigation.navigate('TopTab')}
//       style={[styles.card, { marginRight: 0.05 * screenWidth }]}
//     >
//       <Image source={item.image} style={styles.cardImage} />
//       <Text style={styles.cardTitle}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//       { locale!== "hin"? <Button title="Switch to Hindi" onPress={()=>setLocale("hin")}/>:undefined}
//         <TextInput style={styles.searchInput} placeholder="Search..." />
//         <TouchableOpacity style={styles.profileIcon}>
//           <Image source={require('../assets/profile.png')} style={styles.profileImage} />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.cardTitle}>{I18n.t('Agriculture')}</Text>
//       <FlatList
//         data={DOMAIN_DATA}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.cardContainer}
//         numColumns={3}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 0.02 * screenWidth,
//     paddingHorizontal: 0.05 * screenWidth,
//     marginTop:50,
//   },
//   searchInput: {
//     flex: 1,
//     height: 0.09 * screenWidth,
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     paddingHorizontal: 0.03 * screenWidth,
//   },
//   profileIcon: {
//     marginLeft: 0.04 * screenWidth,
//   },
//   profileImage: {
//     width: 0.13 * screenWidth,
//     height: 0.13 * screenWidth,
//     borderRadius: 0.04 * screenWidth,
//   },
//   cardContainer: {
//     paddingHorizontal: 0.06 * screenWidth,
//     paddingTop: 0.04 * screenWidth,
//   },
//   card: {
//     width: DOMAIN_CARD_WIDTH,
//     marginBottom: 0.04 * screenWidth,
//     alignItems: 'center',
//     padding: 10,
//   },
//   cardImage: {
//     width: DOMAIN_CARD_WIDTH,
//     height: DOMAIN_CARD_WIDTH,
//     borderRadius: DOMAIN_CARD_WIDTH / 2,
//     marginBottom: 0.02 * screenWidth,
//   },
//   cardTitle: {
//     fontSize: 15,
//     textAlign: 'center',
//     color: 'black',
//   },
// });

// export default Category;
