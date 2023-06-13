
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

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
  useEffect(()=>{
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
  // const data = [
  //   {
  //     id: 1,
  //     image: require('../assets/one.png'),
  //     title: 'Prescription Medication',
  //     receivedDate: '01/04/2023',
  //     expiringDate: '01/04/2023',
  //   },
  //   {
  //     id: 2,
  //     image: require('../assets/two.png'),
  //     title: 'Doctor Visit',
  //     receivedDate: '01/04/2023',
  //     expiringDate: '01/04/2023',
  //   },
  //   {
  //     id: 3,
  //     image: require('../assets/one.png'),
  //     title: 'Dental Care',
  //     receivedDate: '01/04/2023',
  //     expiringDate: '01/04/2023',
  //   },
  //   {
  //     id: 4,
  //     image: require('../assets/three.png'),
  //     title: 'Mental Health',
  //     receivedDate: '01/04/2023',
  //     expiringDate: '01/04/2023',
  //   },
  //   Add more data objects for additional cards
  // ];

  return (
    <View style={styles.container}>
      {console.log(data)}
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
