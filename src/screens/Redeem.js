// import React from 'react';
// import { Text, View } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';

// const Redeem = () => {
//   let logoFromFile = require('../assets/transport.png');
//   return (
//     <QRCode
//       value="Just some ksfhkfhkw jhfeifi"
//       logo={logoFromFile}
//     />
//   );
// }
// export default Redeem;

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet } from "react-native";
// import QRCode from "react-native-qrcode-svg";
// import axios from "axios";

// const App = () => {
// const [qrString, setQrString] = useState("");

// // Fetch the string from an API and set it as the qrString state
// // useEffect(() => {
// // axios
// // .get("https://example.com/api/string") // Replace this with your API URL
// // .then((response) => {
// // setQrString(response.data);
// // })
// // .catch((error) => {
// // console.error(error);
// // });
// // }, []);

// return (
// <View style={styles.container}>
// {/* Display the QR code with a logo in the center */}
// <QRCode
// value={qrString} // The string to encode in the QR code
// size={200} // The size of the QR code in pixels
// logo={require("../assets/profile.png")} // The logo image to display in the center of the QR code
// logoSize={50} // The size of the logo image in pixels
// logoBackgroundColor="transparent" // The background color of the logo image
// />
// </View>
// );
// };

// const styles = StyleSheet.create({
// container: {
// flex: 1,
// backgroundColor: "#fff",
// alignItems: "center",
// justifyContent: "center",
// },
// });

// export default App;

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const ProfileIcon = () => {
  return <Image source={require('../assets/profile.png')} style={styles.profileIcon} />;
};

const Redeem = ({navigation}) => {
  const governmentLogo = require('../assets/govt.png');
  const bankLogo = require('../assets/bank.png');
  const eRupi=require('../assets/erupi.png')
  const schemeTitle = 'PM-JAY';
  const singleUse = 'Single Use';
  const amount = 'INR 5000';
  const qrCodeData = 'Your QR Code String';
  const validityDate = 'Validity till - 31/12/2023';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Otp');
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <ProfileIcon />
      </View>
      <View style={styles.logoContainer}>
        <Image source={governmentLogo} style={styles.logo} />
        <Image source={bankLogo} style={styles.logo} />
      </View>
      <View style={styles.schemeDetails}>
        <Text style={styles.maintitle}>{schemeTitle}</Text>
        <Text style={styles.details}>{`${singleUse} | ${amount}`}</Text>
      </View>
      <View style={styles.qrCodeContainer}>
        <QRCode value={qrCodeData} logo={eRupi} logoSize={50} size={250} />
      </View>
      <Text style={styles.validity}>{validityDate}</Text>
      <Text style={styles.info}>Ask Merchant to scan the QR code to redeem the coupon</Text>
      <View style={styles.cardContainer}>
      <Image source={eRupi} style={styles.image} />
      <View style={styles.cardText}>
        <Text style={styles.title}>To know more about e-RUPI</Text>
        <Text style={styles.title}>Click Here</Text>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
    //justifyContent: 'center',
    //alignItems: 'center',
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
    marginTop:15,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    //alignItems: 'center',
    marginBottom: 16,
    marginTop:13,
  },
  logo: {
    width: 60,
    height: 60,
  },
  schemeDetails: {
    marginBottom: 16,
    alignItems: 'center',
  },
  maintitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0E1D61'
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
    backgroundColor:'#0E1D61'
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
});

export default Redeem;
