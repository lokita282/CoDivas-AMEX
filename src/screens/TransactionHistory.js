import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const TransactionHistory = () => {
  const transactionHistory = [
    {
      payee: 'John Doe',
      amount: 1000,
      voucherUid: 'VCH123456',
      date: '2023-06-01',
      time: '10:30 AM',
    },
    {
      payee: 'Jane Wex',
      amount: 5000,
      voucherUid: 'VCH789012',
      date: '2023-06-02',
      time: '2:45 PM',
    },
    // Add more transaction history objects here
  ];

  const renderTransactionHistory = () => {
    return transactionHistory.map((transaction, index) => (
      <View style={styles.transactionContainer} key={index}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.payee}>{transaction.payee}</Text>
        <Text style={styles.amount}>INR {transaction.amount}</Text></View>
        <Text style={styles.details}>{transaction.voucherUid}</Text>
        <Text style={styles.details}>{transaction.date}</Text>
        <Text style={styles.details}>{transaction.time}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.profileIcon}>
          <Image source={require('../assets/profile.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Transaction History</Text>
      <View style={styles.historyContainer}>{renderTransactionHistory()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  profileIcon: {
    marginLeft: 300,
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
    color: '#0E1D61',
  },
  historyContainer: {
    marginTop: 16,
  },
  transactionContainer: {
    backgroundColor: '#F3F5FF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  payee: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0E1D61',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0E1D61',
    marginLeft:150,
    alignSelf: 'flex-end',
  },
  details: {
    fontSize: 12,
    color: '#0E1D61',
    marginTop: 4,
  },
});

export default TransactionHistory;
