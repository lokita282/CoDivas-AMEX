// import React, { useState,useEffect } from "react";
// import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const DOMAIN_DATA = [
//   { id: 1, title: 'Agriculture', image: require('../assets/agriculture.png') },
//   { id: 2, title: 'Education', image: require('../assets/education.png') },
//   { id: 3, title: 'Housing', image: require('../assets/housing.png') },
//   { id: 4, title: 'Food', image: require('../assets/food.png') },
//   { id: 5, title: 'Telecom', image: require('../assets/telecommunication.png') },
//   { id: 6, title: 'Transportation', image: require('../assets/transport.png') },
//   { id: 7, title: 'Health', image: require('../assets/healthcare.png') },
//   { id: 8, title: 'Utility', image: require('../assets/utility.png') },
//   { id: 9, title: 'Other', image: require('../assets/others.png') },
// ];
// const DOMAIN_CARD_WIDTH = 110;
// const screenWidth = Dimensions.get('window').width;
// const numColumns = Math.floor(screenWidth / (DOMAIN_CARD_WIDTH + 35));

// const Category = ({ navigation,route }) => {

//   const [data,setData]=useState(null);
//   async function retrieveUserToken() {
//     try {
//       const user = await AsyncStorage.getItem('codivasUser');
//       if (user !== null) {
//         setData(JSON.parse(user));
//       }
//     } catch (error) {
//       console.log('Error retrieving user token:', error);
//     }
//   }

//   useEffect(() => {
//     retrieveUserToken();
//   }, []);
  
//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => navigation.navigate('TopTab',{paramKey:item.title})}
//       style={[styles.card, { marginRight: 0.05 * screenWidth }]}
//     >
//       <Image source={item.image} style={styles.cardImage} />
//       <Text style={styles.cardTitle}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <>
//     {
//       data?<View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.profileIcon}>
//           <Text style={styles.profileImage}>{data.name.charAt(0)}</Text>
//           {/* <Image source={require('../assets/profile.png')} style={styles.profileImage} /> */}
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={DOMAIN_DATA}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.cardContainer}
//         numColumns={3}
//       />
//     </View>:""
//     }
//     </>
    
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
//     height:50,
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     paddingHorizontal: 0.03 * screenWidth,
//   },
//   profileIcon: {
//     marginLeft: 290,
//   },
//   profileImage: {
//     width: 0.13 * screenWidth,
//     height: 0.13 * screenWidth,
//     borderRadius: 0.04 * screenWidth,
//     backgroundColor:'#0E1D61',
//     borderRadius:50,
//     color:'white',
//     textAlign:'center',
//     fontSize:30,
//     padding:5,
  
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
//     //textAlign: 'center',
//     fontWeight:'bold',
//     color: 'black',
//   },
// });

// export default Category;


// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   Dimensions,
//   SafeAreaView,
//   Platform,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Picker } from "@react-native-picker/picker";

// const DOMAIN_DATA = [
//   { id: 1, title: 'Agriculture', image: require('../assets/agriculture.png'), hindiTitle: 'कृषि', tamilTitle: 'விவசாயம்', marathiTitle: 'शेती', gujaratiTitle: 'ખેડૂત' },
//   { id: 2, title: 'Education', image: require('../assets/education.png'), hindiTitle: 'शिक्षा', tamilTitle: 'கல்வி', marathiTitle: 'शिक्षण', gujaratiTitle: 'શિક્ષણ' },
//   { id: 3, title: 'Housing', image: require('../assets/housing.png'), hindiTitle: 'आवास', tamilTitle: 'வீடு', marathiTitle: 'घरबंध', gujaratiTitle: 'હાઉસિંગ' },
//   { id: 4, title: 'Food', image: require('../assets/food.png'), hindiTitle: 'खाद्य', tamilTitle: 'உணவு', marathiTitle: 'अन्न', gujaratiTitle: 'ખોરાક' },
//   { id: 5, title: 'Telecom', image: require('../assets/telecommunication.png'), hindiTitle: 'दूरसंचार', tamilTitle: 'தொலைத்தலைப்பு', marathiTitle: 'दूरसंचार', gujaratiTitle: 'દૂરસંપર્ક' },
//   { id: 6, title: 'Transportation', image: require('../assets/transport.png'), hindiTitle: 'परिवहन', tamilTitle: 'போக்குவரத்து', marathiTitle: 'परिवहन', gujaratiTitle: 'પરિવહન' },
//   { id: 7, title: 'Health', image: require('../assets/healthcare.png'), hindiTitle: 'स्वास्थ्य', tamilTitle: 'சுகாதார', marathiTitle: 'आरोग्य', gujaratiTitle: 'આરોગ્ય' },
//   { id: 8, title: 'Utility', image: require('../assets/utility.png'), hindiTitle: 'सुविधा', tamilTitle: 'உபயோகம்', marathiTitle: 'सुविधा', gujaratiTitle: 'ઉપયોગિતા' },
//   { id: 9, title: 'Other', image: require('../assets/others.png'), hindiTitle: 'अन्य', tamilTitle: 'மற்ற', marathiTitle: 'इतर', gujaratiTitle: 'અન્ય' },

// ];

// const DOMAIN_CARD_WIDTH = 110;
// const screenWidth = Dimensions.get("window").width;
// //const numColumns = Math.floor(screenWidth / (DOMAIN_CARD_WIDTH + 35));

// const Category = ({ navigation, route }) => {
//   const [data, setData] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState("English");

//   async function retrieveUserToken() {
//     try {
//       const user = await AsyncStorage.getItem("codivasUser");
//       if (user !== null) {
//         setData(JSON.parse(user));
//       }
//     } catch (error) {
//       console.log("Error retrieving user token:", error);
//     }
//   }

//   useEffect(() => {
//     retrieveUserToken();
//   }, []);

//   const languageOptions = [
//     { label: "English", value: "English" },
//     { label: "Hindi", value: "Hindi" },
//     { label: "Tamil", value: "Tamil" },
//     { label: "Marathi", value: "Marathi" },
//     { label: "Gujarati", value: "Gujarati" },
//   ];

//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//   };

//   const getLocalizedTitle = (item) => {
//     switch (selectedLanguage) {
//       case "Hindi":
//         return item.hindiTitle;
//       case "Tamil":
//         return item.tamilTitle;
//       case "Marathi":
//         return item.marathiTitle;
//       case "Gujarati":
//         return item.gujaratiTitle;
//       default:
//         return item.title;
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate("TopTab", { paramKey: item.title })
//       }
//       style={[styles.card, { marginRight: 0.05 * screenWidth }]}
//     >
//       <Image source={item.image} style={styles.cardImage} />
//       <Text style={styles.cardTitle}>{getLocalizedTitle(item)}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {data && (
//         <>
//           <View style={styles.header}>
//             <View style={styles.languageDropdown}>
//               <Picker
//                 selectedValue={selectedLanguage}
//                 onValueChange={handleLanguageChange}
//                 style={styles.dropdown}
//               >
//                 {languageOptions.map((option, index) => (
//                   <Picker.Item
//                     key={index}
//                     label={option.label}
//                     value={option.value}
//                   />
//                 ))}
//               </Picker>
//             </View>
//             <TouchableOpacity style={styles.profileIcon}>
//               <Text style={styles.profileImage}>{data.name.charAt(0)}</Text>
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={DOMAIN_DATA}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//             contentContainerStyle={styles.cardContainer}
//             numColumns={3}
//           />
//         </>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Platform.OS === "android" ? 25 : 0,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: 0.02 * screenWidth,
//     paddingHorizontal: 0.05 * screenWidth,
//     marginTop: Platform.OS === "android" ? 15 : -20,
//   },
//   searchInput: {
//     flex: 1,
//     height: 50,
//     backgroundColor: "#ffffff",
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
//     backgroundColor: "#0E1D61",
//     borderRadius: 50,
//     color: "white",
//     textAlign: "center",
//     fontSize: 30,
//     padding: 5,
//   },
//   cardContainer: {
//     paddingHorizontal: 0.03 * screenWidth,
//     paddingTop: 0.04 * screenWidth,
//   },
//   card: {
//     width: DOMAIN_CARD_WIDTH,
//     marginBottom: 0.04 * screenWidth,
//     alignItems: "center",
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
//     fontWeight: "bold",
//     color: "black",
//     textAlign: "center",
//   },
//   languageDropdown: {
//     width: 150,
//     borderRadius: 20,
//     overflow: 'hidden',
//     marginBottom: Platform.OS === 'ios' ? 10 : 0, // Add this line
//   },

//   dropdown: {
//     borderRadius: 20,
//     height: Platform.OS === 'android' ? 0 : 120,
//     marginBottom: Platform.OS === 'ios' ? -10 : 0, // Add this line
//   },
//   // languageDropdown: {
//   //   width: 150,
//   //   borderRadius: 20,
//   //   overflow: "hidden",
//   // },
//   // dropdown: {
//   //   borderRadius: 20,
//   //   height:Platform.OS === "android" ? 0 : 120,
//   // },
// });

// export default Category;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  Platform,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

const DOMAIN_DATA = [
  { id: 1, title: 'Agriculture', image: require('../assets/agriculture.png'), hindiTitle: 'कृषि', tamilTitle: 'விவசாயம்', marathiTitle: 'शेती', gujaratiTitle: 'ખેડૂત' },
  { id: 2, title: 'Education', image: require('../assets/education.png'), hindiTitle: 'शिक्षा', tamilTitle: 'கல்வி', marathiTitle: 'शिक्षण', gujaratiTitle: 'શિક્ષણ' },
  { id: 3, title: 'Housing', image: require('../assets/housing.png'), hindiTitle: 'आवास', tamilTitle: 'வீடு', marathiTitle: 'घरबंध', gujaratiTitle: 'હાઉસિંગ' },
  { id: 4, title: 'Food', image: require('../assets/food.png'), hindiTitle: 'खाद्य', tamilTitle: 'உணவு', marathiTitle: 'अन्न', gujaratiTitle: 'ખોરાક' },
  { id: 5, title: 'Telecom', image: require('../assets/telecommunication.png'), hindiTitle: 'दूरसंचार', tamilTitle: 'தொலைத்தலைப்பு', marathiTitle: 'दूरसंचार', gujaratiTitle: 'દૂરસંપર્ક' },
  { id: 6, title: 'Transportation', image: require('../assets/transport.png'), hindiTitle: 'परिवहन', tamilTitle: 'போக்குவரத்து', marathiTitle: 'परिवहन', gujaratiTitle: 'પરિવહન' },
  { id: 7, title: 'Health', image: require('../assets/healthcare.png'), hindiTitle: 'स्वास्थ्य', tamilTitle: 'சுகாதார', marathiTitle: 'आरोग्य', gujaratiTitle: 'આરોગ્ય' },
  { id: 8, title: 'Utility', image: require('../assets/utility.png'), hindiTitle: 'सुविधा', tamilTitle: 'உபயோகம்', marathiTitle: 'सुविधा', gujaratiTitle: 'ઉપયોગિતા' },
  { id: 9, title: 'Other', image: require('../assets/others.png'), hindiTitle: 'अन्य', tamilTitle: 'மற்ற', marathiTitle: 'इतर', gujaratiTitle: 'અન્ય' },
];

const DOMAIN_CARD_WIDTH = 110;
const screenWidth = Dimensions.get("window").width;

const Category = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [modalVisible, setModalVisible] = useState(false);

  async function retrieveUserToken() {
    try {
      const user = await AsyncStorage.getItem("codivasUser");
      if (user !== null) {
        setData(JSON.parse(user));
      }
    } catch (error) {
      console.log("Error retrieving user token:", error);
    }
  }

  useEffect(() => {
    retrieveUserToken();
  }, []);

  const languageOptions = [
    { label: "English", value: "English" },
    { label: "Hindi", value: "Hindi" },
    { label: "Tamil", value: "Tamil" },
    { label: "Marathi", value: "Marathi" },
    { label: "Gujarati", value: "Gujarati" },
  ];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const getLocalizedTitle = (item) => {
    switch (selectedLanguage) {
      case "Hindi":
        return item.hindiTitle;
      case "Tamil":
        return item.tamilTitle;
      case "Marathi":
        return item.marathiTitle;
      case "Gujarati":
        return item.gujaratiTitle;
      default:
        return item.title;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        navigation.navigate("TopTab", { paramKey: item.title })
      }}
      style={[styles.card, { marginRight: 0.05 * screenWidth }]}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{getLocalizedTitle(item)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {data && (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => setModalVisible(true)}
            >
              <Image
                source={require("../assets/globe.jpg")}
                style={{width:30, height:30, borderRadius:50}}
              />
              <Text style={styles.languageButtonText}>{selectedLanguage}</Text>
            </TouchableOpacity>
            <View style={styles.profileIconContainer}>
              <TouchableOpacity style={styles.profileIcon}>
                <Text style={styles.profileImage}>{data.name.charAt(0)}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={DOMAIN_DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cardContainer}
            numColumns={3}
          />

          {/* Language Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Language</Text>
                {languageOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.languageOption}
                    onPress={() => {
                      handleLanguageChange(option.value);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.languageOptionText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 0.02 * screenWidth,
    paddingRight: 0.05 * screenWidth,
    marginTop: Platform.OS === "android" ? 15 : 10,
    paddingLeft:0.03 * screenWidth,
    height:'10%'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 0.03 * screenWidth,
  },
  // profileIcon: {
  //   marginLeft: 0.04 * screenWidth,
  // },
  // profileImage: {
  //   width: 0.13 * screenWidth,
  //   height: 0.13 * screenWidth,
  //   borderRadius: 0.04 * screenWidth,
  //   backgroundColor: "#0E1D61",
  //   borderRadius: 50,
  //   color: "white",
  //   textAlign: "center",
  //   fontSize: 30,
  //   padding: 5,
  // },
  profileIconContainer: {
    marginLeft: 0.04 * screenWidth,
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
  cardContainer: {
    paddingHorizontal: 0.03 * screenWidth,
    paddingTop: 0.04 * screenWidth,
  },
  card: {
    width: DOMAIN_CARD_WIDTH,
    marginBottom: 0.04 * screenWidth,
    alignItems: "center",
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
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  languageButton: {
    width: 120,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    flexDirection:'row',
    alignItems: "center",
    justifyContent: "center",
    height:'100%'
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft:5
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  languageOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  languageOptionText: {
    fontSize: 16,
  },
});

export default Category;
