// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';

// const screenWidth = Dimensions.get('window').width;
// const GovernmentScheme = () => {

//   const [searchText, setSearchText] = useState('');
//   const [governmentSchemes, setGovernmentSchemes] = useState([
//     'Smart Cities Mission Portal by Ministry of Urban Development.',
//     'Guidelines for Integrated Development of Commercial Floriculture Scheme.',
//     'Social defence schemes of Ministry of Social Justice and Empowerment.',
//     'Schemes and programmes for differently abled by Ministry of Social Justice and Empowerment.',
//     'National Rural Employment Guarantee Scheme by Ministry of Rural Development',
//     'Pradhan Mantri Awas Yojana (Housing for All) by Ministry of Housing and Urban Affairs',
//     'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) by Ministry of Agriculture and Farmers Welfare',
//     'Beti Bachao Beti Padhao (Save the Girl Child, Educate the Girl Child) by Ministry of Women and Child Development',
//     'Digital India Initiative by Ministry of Electronics and Information Technology',
//     'Ayushman Bharat (Pradhan Mantri Jan Arogya Yojana) by Ministry of Health and Family Welfare',
//     'Pradhan Mantri Matru Vandana Yojana by Ministry of Women and Child Development',
//   ]);

//   const renderGovernmentSchemes = () => {
//     return governmentSchemes.map((scheme, index) => (
//       <View style={styles.card} key={index}>
//         <Image source={require('../assets/indian.png')} style={styles.logo} />
//         <Text style={styles.info}>{scheme}</Text>
//       </View>
//     ));
//   };

//   return (
//     <ScrollView>
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TextInput style={styles.searchInput} placeholder="Search..." />
//         <TouchableOpacity style={styles.profileIcon}>
//           <Image source={require('../assets/profile.png')} style={styles.profileImage} />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.schemesContainer}>{renderGovernmentSchemes()}</View>
//     </View>
//     </ScrollView>
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
//     paddingHorizontal: 0.04 * screenWidth,
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
//   title: {
//     fontSize: 0.06 * screenWidth,
//     fontWeight: 'bold',
//     marginTop: 0.04 * screenWidth,
//   },
//   searchBar: {
//     marginTop: 0.02 * screenWidth,
//     padding: 0.02 * screenWidth,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 0.02 * screenWidth,
//   },
//   schemesContainer: {
//     marginTop: 0.04 * screenWidth,
//     padding: 0.04 * screenWidth,
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 0.04 * screenWidth,
//     borderWidth: 1,
//     width: 0.9 * screenWidth,
//     borderColor: 'gray',
//     borderRadius: 0.02 * screenWidth,
//     marginVertical: 0.02 * screenWidth,
//   },
//   logo: {
//     width: 35,
//     height: 35,
//     resizeMode:'contain'
//   },
//   info:{
//     marginLeft:5,
//     marginRight:15,
//   }
// });

// export default GovernmentScheme;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const GovernmentScheme = () => {
  const [searchText, setSearchText] = useState("");
  const [governmentSchemes, setGovernmentSchemes] = useState([
    {
      organization: "Ministry Of Minority Affairs",
      scheme: "Pre Matric Scholarship For Minorities",
      description:
        "A scholarship scheme by Ministry of Minority Affairs for students from minority communities studying in Class 1st to Class 10th in India in a government or private school, including such residential G...",
      categories: [
        "Admission Fee",
        "Education",
        "Minority",
        "Pre-matric",
        "Scholarship",
        "School",
        "Student",
        "Social Welfare",
      ],
    },
    {
      organization: "Ministry of Education",
      scheme: "Affordable Education Scheme",
      description:
        "The Affordable Education Scheme aims to provide financial assistance to students from economically disadvantaged backgrounds to ensure they have access to quality education. The scheme covers students...",
      categories: [
        "Education",
        "Affordable",
        "Scholarship",
        "Tuition",
        "School",
        "Students",
        "Financial Aid",
      ],
    },
    {
      organization: "Ministry of Power",
      scheme: "Energy Efficiency Bill Scheme",
      description:
        "The Energy Efficiency Bill Scheme is aimed at promoting energy conservation and reducing electricity bills for households. Under this scheme, eligible households can receive financial incentives and s...",
      categories: [
        "Energy",
        "Efficiency",
        "Bills",
        "Savings",
        "Environment",
        "Renewable Energy"
      ],
    },
    {
      organization: "Ministry of Health and Family Welfare",
      scheme: "Improving Access to Healthcare Services",
      description:
        "The Healthcare Access Program aims to ensure that every individual has access to affordable and quality healthcare services. Under this scheme, eligible individuals...",
      categories: [
        "Healthcare",
        "Medical Services",
        "Access",
        "Affordable",
        "Health Insurance",
        "Public Health"
      ],
    },
    {
      organization: "Ministry of Education",
      scheme: "Affordable Education Scheme",
      description:
        "The Affordable Education Scheme aims to provide financial assistance to students from economically disadvantaged backgrounds to ensure they have access to quality education. The scheme covers students...",
      categories: [
        "Education",
        "Affordable",
        "Scholarship",
        "Tuition",
        "School",
        "Students",
        "Financial Aid",
      ],
    },
    {
      organization: "Ministry of Information and Technology",
      scheme: "Empowering Individuals with Digital Skills",
      description:
        "The Digital Literacy Initiative aims to bridge the digital divide by providing individuals with the necessary skills to navigate and utilize digital...",
      categories: [
        "Digital Literacy",
        "Skills Development",
        "Technology",
        "Internet",
        "Empowerment",
        "Education"
      ],
    },
    // Add more schemes here...
  ]);

  const renderGovernmentSchemes = () => {
    return governmentSchemes.map((scheme, index) => (
      <View style={styles.card} key={index}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{scheme.organization}</Text>
        </View>
        <Text style={styles.schemeName}>{scheme.scheme}</Text>
        <Text style={styles.schemeDescription}>{scheme.description}</Text>
        <View style={styles.categoryTagsContainer}>
          {scheme.categories.map((category, index) => (
            <View style={styles.categoryTag} key={index}>
              <Text style={styles.categoryTagText}>{category}</Text>
            </View>
          ))}
        </View>
      </View>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 0.02 * screenWidth,
    paddingHorizontal: 0.04 * screenWidth,
    marginTop: 70,
  },
  searchInput: {
    flex: 1,
    height: 0.095 * screenWidth,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 0.03 * screenWidth,
  },
  profileIcon: {
    marginLeft: 0.04 * screenWidth,
  },
  title: {
    fontSize: 0.06 * screenWidth,
    fontWeight: "bold",
    marginTop: 0.04 * screenWidth,
  },
  searchBar: {
    marginTop: 0.04 * screenWidth,
    padding: 0.02 * screenWidth,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 0.02 * screenWidth,
  },
  schemesContainer: {
    marginTop: 0.04 * screenWidth,
    padding: 0.04 * screenWidth,
  },
  card: {
    padding: 0.04 * screenWidth,
    borderWidth: 1,
    width: 0.9 * screenWidth,
    borderColor: "gray",
    borderRadius: 0.02 * screenWidth,
    marginVertical: 0.02 * screenWidth,
  },
  categoryContainer: {
    //backgroundColor: "lightgray",
    //paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  category: {
    color:'gray',
  },
  schemeName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  schemeDescription: {
    marginBottom: 8,
    color:'gray',
    justifyContent:'space-between'
  },
  categoryTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryTag: {
    backgroundColor: "#D3D3D3",
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  categoryTagText: {
    fontSize: 12,
  },
});

export default GovernmentScheme;
