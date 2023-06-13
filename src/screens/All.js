
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Card = ({ image, title, receivedDate, expiringDate}) => {
  return (

    <View style={styles.cardContainer}>
      <Image source={{uri:image}} style={styles.image} />
      <View style={styles.cardText}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>{`Received: ${receivedDate}`}</Text>
        <Text style={styles.info}>{`Expiring: ${expiringDate}`}</Text>
      </View>
    </View>
  );
};

const All = ({navigation}) => {
  const [data, setData] = useState([]);
  const tok = AsyncStorage.getItem('userToken')
  console.log(tok);
  // useEffect(() => {
  //   try {
  //     const token = AsyncStorage.getItem('userToken');
  //     if (token !== null) {
  //       console.log('User token retrieved successfully:',AsyncStorage.getItem('userToken'));
  //       // Do something with the token, such as updating state or navigating to another screen.
  //     }
  //   } catch (error) {
  //     console.log('Error retrieving user token:', error);
  //   }
  // });

  async function retrieveUserToken() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        console.log('User token retrieved successfully:', token);
        // Do something with the token, such as updating state or navigating to another screen.
      }
    } catch (error) {
      console.log('Error retrieving user token:', error);
    }
  };
  //retrieveUserToken();
  useEffect(()=>{
    retrieveUserToken();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDg0ZDhlYTk4YmJjODkzYjc3OTI1ZTUiLCJpYXQiOjE2ODY1NTk0NjcsImV4cCI6MTY4NjY0NTg2N30._ErTIBiAeoZCHQEuRn0shoTKGEpckp5vu35Xk4p_VIg");
  
    var raw = "";
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    async function fetchData(){
      await fetch("https://ez-rupi.onrender.com/api/beneficiary/multiple/education", requestOptions)
      .then(response => response.json())
      .then(result => (setData(result.data)))
      .catch(error => console.log('error', error));
    }
    fetchData();
  });
  return (
    <View style={styles.container}>
     {/* {console.log(data)} */}
      {data.map((item) => (
      <TouchableOpacity onPress={() =>
              navigation.navigate('Redeem')}style={styles.card}>
        <Card
          key={item._id}
          image={item.issuedByLogo}
          title={item.title}
          receivedDate={item.startsAt}
          expiringDate={item.endsAt}
        /></TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'white',
    margin:10,
    width: 370,
    height: 79,
    borderRadius:5
    //marginBottom: 16,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight:30,
    borderRadius: 4,
  },
  cardText: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    color:'black'
  },
  info:{
    fontSize:12,
    margin:3,
  }
});

export default All;
