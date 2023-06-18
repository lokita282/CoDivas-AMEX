import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/moment';
import LottieView from 'lottie-react-native';

const ProfileIcon = () => {
  return <Image source={require('../assets/profile.png')} style={styles.profileIcon} />;
};

const Redeem = ({navigation,route}) => {
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
      //console.log('Error retrieving user token:', error);
    }
  };
  useEffect(()=>{
    retrieveUserToken();
    //console.log(userToken);
  })
  const governmentLogo = require('../assets/govt.png');
  const bankLogo = require('../assets/bank.png');
  const eRupi=require('../assets/erupi.png')
  const schemeTitle = 'PM-JAY';
  const singleUse = 'Single Use';
  const amount = 'INR 5000';
  const id=route.params.paramKey
  //{console.log(id)}

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
      await fetch(`https://ez-rupi.onrender.com/api/beneficiary/single/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => (setData(result.data)))
      .catch(error => console.log('error', error));
    }
    fetchData();},5000);
    //console.log(data)
    return () => clearTimeout(timer);
    
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Otp',{paramKey:id});
    }, 15000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const qrCodeData = data.qrString;
  {console.log(typeof(data.useType))};
  if (data.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <LottieView source={require('../assets/notfound.json')} autoPlay loop />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <ProfileIcon />
      </View>
      <View style={styles.logoContainer}>
        <Image source={{uri:data.orgLogo}} style={styles.logo} />
        <Image source={{uri:data.issuedByLogo}} style={styles.logo} />
      </View>
      <View style={styles.schemeDetails}>
        <Text style={styles.maintitle}>{data.title}</Text>
        <Text style={styles.details}>{data.useType.charAt(0).toUpperCase() + data.useType.slice(1)}| ₹ {data.amount}</Text>
      </View>
      <View style={styles.qrCodeContainer}>
        <QRCode value={qrCodeData} logo={eRupi} logoSize={50} size={250} />
      </View>
      <Text style={styles.validity}>Valid till : {moment(data.validity).format("MMM Do, YYYY")}</Text>
      <Text style={styles.info}>Ask Merchant to scan the QR code to redeem the coupon.</Text>
      <View style={styles.cardContainer}>
      <Image source={eRupi} style={styles.image} />
      <View style={styles.cardText}>
        <Text style={styles.title}>To know more about e-RUPI</Text>
        <Text style={styles.title1}>Click Here</Text>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  profileIcon: {
    width: 50,
    height: 50,
    marginLeft:330,
    marginTop:50,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 16,
    marginTop:13,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius:50,
  },
  schemeDetails: {
    marginBottom: 16,
    alignItems: 'center',
  },
  maintitle: {
    fontSize: 30,
    textAlign:'center',
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#375EC0'
  },
  details: {
    fontSize: 20,
    color:'black',
    fontWeight:'bold'
  },
  qrCodeContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  validity: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight:'bold',
    color:'black'
  },
  info: {
    fontSize: 14,
    marginTop:10,
    marginRight:50,
    marginLeft:50,
    alignSelf: 'center',
    justifyContent:'center',
    textAlign:'center',
    fontWeight:'bold',
    color:'#4A4A4A'
  },
  cardContainer: {
    flexDirection: 'row',
    width:400,
    alignItems: 'center',
    marginTop:60,
    padding:10,
    marginLeft:0,
    backgroundColor:'#375EC0'
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 4,
  },
  cardText: {
    flex: 1,
    textAlign:'center',
    color:'white',
    fontWeight:'bold'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
    color:'white'
  },
  title1: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
    color:'white',
    textDecorationLine:'underline',
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
});

export default Redeem;
