import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

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

// import React, { useState } from 'react';
// import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

// const DOMAIN_DATA = [
//   { id: 1, title: 'Agriculture', image: require('../assets/agriculture.png'), hindiTitle: 'कृषि' },
//   { id: 2, title: 'Education', image: require('../assets/education.png'), hindiTitle: 'शिक्षा' },
//   { id: 3, title: 'Housing', image: require('../assets/housing.png'), hindiTitle: 'आवास' },
//   { id: 4, title: 'Food', image: require('../assets/food.png'), hindiTitle: 'भोजन' },
//   { id: 5, title: 'Telecom', image: require('../assets/telecommunication.png'), hindiTitle: 'दूरसंचार' },
//   { id: 6, title: 'Transportation', image: require('../assets/transport.png'), hindiTitle: 'परिवहन' },
//   { id: 7, title: 'Health', image: require('../assets/healthcare.png'), hindiTitle: 'स्वास्थ्य' },
//   { id: 8, title: 'Utility', image: require('../assets/utility.png'), hindiTitle: 'उपयोगिता' },
//   { id: 9, title: 'Other', image: require('../assets/others.png'), hindiTitle: 'अन्य' },
// ];

// const DOMAIN_CARD_WIDTH = 110;
// const screenWidth = Dimensions.get('window').width;
// const numColumns = 3;

// const Category = ({ navigation, route }) => {
//   const [isHindi, setIsHindi] = useState(false);

//   const toggleLanguage = () => {
//     setIsHindi((prev) => !prev);
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => navigation.navigate('TopTab', { paramKey: item.title })}
//       style={[styles.card, { marginRight: 0.05 * screenWidth }]}
//     >
//       <Image source={item.image} style={styles.cardImage} />
//       <Text style={styles.cardTitle}>{isHindi ? item.hindiTitle : item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TextInput style={styles.searchInput} placeholder={isHindi ? 'खोजें...' : 'Search...'} />
//         <TouchableOpacity style={styles.profileIcon}>
//           <Image source={require('../assets/profile.png')} style={styles.profileImage} />
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={DOMAIN_DATA}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.cardContainer}
//         numColumns={numColumns}
//       />
//       <TouchableOpacity style={styles.toggleButton} onPress={toggleLanguage}>
//         <Text style={styles.toggleButtonText}>{isHindi ? 'English' : 'हिन्दी'}</Text>
//       </TouchableOpacity>
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
//     marginTop: 50,
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
//     paddingHorizontal: 0.03 * screenWidth,
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
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   toggleButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     borderRadius: 30,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   toggleButtonText: {
//     color: 'white',
//     fontSize: 12,
//   },
// });

// export default Category;
