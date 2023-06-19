import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/moment';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const Card = ({ image, title, receivedDate, expiringDate,amount}) => {
  return (

    <View style={styles.cardContainer}>
      <Image source={{uri:image}} style={styles.image} />
      <View style={styles.cardText}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.info, styles.dateText]}>
          {`Received On - `}
          <Text style={styles.normalText}>{moment(receivedDate).format('MMM Do, YYYY')}</Text>
        </Text>
        <Text style={[styles.info, styles.dateText]}>
          {`Expiring On - `}
          <Text style={styles.normalText}>{moment(expiringDate).format('MMM Do, YYYY')}</Text>
        </Text>
        <Text style={[styles.info, styles.dateText]}>
          {`Reedemable Amount - `}
          <Text style={styles.normalText}>₹ {amount}</Text>
        </Text>
      </View>
    </View>
  );
};

const Redeemed = ({title}) => {
  const navigation = useNavigation();
  //const title=route.params.title;
  const lowercaseTitle = title.charAt(0).toLowerCase() + title.slice(1);
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
      await fetch(`https://ez-rupi.onrender.com/api/beneficiary/multiple/${lowercaseTitle}/redeemed`, requestOptions)
      .then(response => response.json())
      .then(result => (setData(result.data)))
      .catch(error => console.log('error', error));
    }
    fetchData();},5000);
    return () => clearTimeout(timer);
  });
  if (data.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Image source={require('../assets/notfound.png')} style={styles.notfound}/>
        {/* <LottieView source={require('../assets/notfound.json')} autoPlay loop /> */}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* {console.log(data)} */}
      {data.map((item,index) => (
        <Card
          key={item._id}
          image={item.issuedByLogo}
          title={item.title}
          receivedDate={item.startsAt.toString().slice(0,10)}
          expiringDate={item.endsAt.toString().slice(0,10)}
          amount={item.useType==="single"?item.amount:item.balanceAmount}
        />
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
    height: 100,
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
  info: {
    fontSize: 12,
    margin: 3,
  },
  dateText: {
    color: '#333333',
    fontWeight: 'bold',
  },
  normalText: {
    fontWeight: 'normal',
    color:'black'
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  notfound:{
    resizeMode:'contain',
    height:200,
    width:300,
  }
});

export default Redeemed;
