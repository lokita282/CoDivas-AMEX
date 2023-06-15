import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/moment';

const TransactionHistory = () => {
  const [data, setData] = useState([]);
  const [userToken,setUserToken] = useState('')
  async function retrieveUserToken() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        //console.log('User token retrieved successfully:', token);
        setUserToken(token);
      }
    } catch (error) {
      console.log('Error retrieving user token:', error);
    }
  };
  useEffect(()=>{
    retrieveUserToken();
    //console.log(userToken);
  })
  useEffect(()=>{
    const timer=setTimeout(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);
  
    var raw = "";
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    async function fetchData(){
      await fetch("https://ez-rupi.onrender.com/api/beneficiary/transactions", requestOptions)
      .then(response => response.json())
      .then(result => (setData(result.data)))
      .catch(error => console.log('error', error));
    }
    fetchData();},5000);
    return () => clearTimeout(timer);
  });

  const renderTransactionHistory = () => {
    return data.map((transaction, index) => (
      <View style={styles.transactionContainer} key={index}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.payee}>{transaction.voucherTitle}</Text>
        <View>
        <Text style={styles.amount}>₹{transaction.amount}</Text></View>
        </View>
        <Text style={styles.details}>Voucher ID :{transaction.voucherUid}</Text>
        <Text style={styles.details}>{moment(transaction.datetime).format("MMM Do YYYY")} at {moment(transaction.datetime).format("h:mm a")} </Text>
      </View>
    ));
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.profileIcon}>
          <Image source={require('../assets/profile.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Transaction History</Text>
      <View style={styles.historyContainer}>{renderTransactionHistory()}</View>
    </View>
    </ScrollView>
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
    fontSize: 15,
    color: '#0E1D61',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0E1D61',
    //marginLeft:70,
  },
  details: {
    fontSize: 12,
    color: '#0E1D61',
    marginTop: 4,
  },
});

export default TransactionHistory;
