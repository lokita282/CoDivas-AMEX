
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const Card = ({ image, title, receivedDate, expiringDate}) => {
  return (

    <View style={styles.cardContainer} >
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
  const [userToken,setUserToken] = useState('')
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

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
      await fetch("https://ez-rupi.onrender.com/api/beneficiary/multiple/education", requestOptions)
      .then(response => response.json())
      .then(result => (setData(result.data)))
      .catch(error => console.log('error', error));
    }
    fetchData();},5000);
    return () => clearTimeout(timer);
  });
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <LottieView
        source={require('../assets/load.json')} // Replace with the path to your Lottie animation file
        autoPlay
        loop
    />
      </View>
    );
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      {/* {console.log(data)} */}
      {data.map((item,index) => (
      <TouchableOpacity onPress={() =>
              navigation.navigate('Redeem',{paramKey:item._id})}style={styles.card} key={index}>
        <Card
          key={item._id}
          image={item.issuedByLogo}
          title={item.title}
          receivedDate={item.startsAt.toString().slice(0,10)}
          expiringDate={item.endsAt.toString().slice(0,10)}
        /></TouchableOpacity>
      ))}
    </View>
    </ScrollView>
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
  loader:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
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
