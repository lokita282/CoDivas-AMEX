import React from 'react';
import { View, Text, StyleSheet, ScrollView,Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;
const Details = ({ route }) => {
  const { scheme } = route.params;

  const renderListItems = (items) => {
    return items.map((item, index) => (
      <Text key={index} style={styles.listItem}>
        {`${index + 1}. ${item}`}
      </Text>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{marginLeft:15}}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{scheme.organization}</Text>
        </View>
        <Text style={styles.schemeName}>{scheme.scheme}</Text>
        <View style={styles.categoryTagsContainer}>
          {scheme.categories.map((category, index) => (
            <View style={styles.categoryTag} key={index}>
              <Text style={styles.categoryTagText}>{category}</Text>
            </View>
          ))}
        </View>
        </View>
      <View style={styles.card}>
        <Text style={styles.title}>Details</Text>
        <Text style={styles.detailsText}>{scheme.details}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Benefits</Text>
        {renderListItems(scheme.benefits)}
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Eligibility</Text>
        {renderListItems(scheme.eligibility)}
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Application Process</Text>
        {renderListItems(scheme.applicationProcess)}
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Required Documents</Text>
        {renderListItems(scheme.requiredDocuments)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 16,
  },
  card: {
    //backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsText: {
    textAlign: 'justify',
    color:'grey'
  },
  listItem: {
    marginLeft: 16,
    marginBottom: 8,
    color:'grey'
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop:50,
    marginBottom: 0.02 * screenWidth,
  },
  category: {
    fontSize: 14,
    fontWeight: "normal",
    color:'gray'
  },
  schemeName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0.02 * screenWidth,
  },
  schemeDescription: {
    fontSize: 14,
    marginBottom: 0.02 * screenWidth,
    color:'grey'
  },
  categoryTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryTag: {
    backgroundColor: "#ECECEC",
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  categoryTagText: {
    fontSize: 12,
  },
});

export default Details;
