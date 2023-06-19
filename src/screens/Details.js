import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

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
    flex: 1,
    padding: 16,
    marginTop:50,
  },
  card: {
    backgroundColor: '#FFFFFF',
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
});

export default Details;
