
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// const Card = ({ image, title, receivedDate, expiringDate }) => {
//   return (
//     <View style={styles.cardContainer}>
//       <Image source={image} style={styles.image} />
//       <View style={styles.cardText}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.info}>{`Received: ${receivedDate}`}</Text>
//         <Text style={styles.info}>{`Expiring: ${expiringDate}`}</Text>
//       </View>
//     </View>
//   );
// };

// const Redeemed = () => {
//   const [data, setData] = useState([]);
//   const [userToken,setUserToken] = useState('')
//   async function retrieveUserToken() {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (token !== null) {
//         console.log('User token retrieved successfully:', token);
//         setUserToken(token);
//       }
//     } catch (error) {
//       console.log('Error retrieving user token:', error);
//     }
//   };
//   useEffect(()=>{
//     retrieveUserToken();
//     console.log(userToken);
//   })

//   useEffect(()=>{
//     const timer=setTimeout(()=>{
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${userToken}`);
  
//     var raw = "";
  
//     var requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };
//     async function fetchData(){
//       await fetch("https://ez-rupi.onrender.com/api/beneficiary/multiple/utility", requestOptions)
//       .then(response => response.json())
//       .then(result => (setData(result.data)))
//       .catch(error => console.log('error', error));
//     }
//     fetchData();},5000);
//     return () => clearTimeout(timer);
//   });
//   return (
//     <View style={styles.container}>
//       {data.map((item) => (
//         <Card
//           key={item.id}
//           image={item.image}
//           title={item.title}
//           receivedDate={item.receivedDate}
//           expiringDate={item.expiringDate}
//         />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   cardContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor:'white',
//     margin:10,
//     width: 370,
//     height: 79,
//     borderRadius:5
//     //marginBottom: 16,
//   },
//   image: {
//     width: 30,
//     height: 30,
//     marginLeft: 20,
//     marginRight:30,
//     borderRadius: 4,
//   },
//   cardText: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginBottom: 4,
//     color:'black'
//   },
//   info:{
//     fontSize:12,
//     margin:3,
//   }
// });

// export default Redeemed;


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

const Redeemed = ({navigation}) => {
  const [data, setData] = useState([]);
  const [userToken,setUserToken] = useState('')
  async function retrieveUserToken() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        console.log('User token retrieved successfully:', token);
        setUserToken(token);
      }
    } catch (error) {
      console.log('Error retrieving user token:', error);
    }
  };
  useEffect(()=>{
    retrieveUserToken();
    console.log(userToken);
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
      await fetch("https://ez-rupi.onrender.com/api/beneficiary/multiple/education/valid", requestOptions)
      .then(response => response.json())
      .then(result => (setData(result.data)))
      .catch(error => console.log('error', error));
    }
    fetchData();},5000);
    return () => clearTimeout(timer);
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
          receivedDate={item.startsAt.toString().slice(0,10)}
          expiringDate={item.endsAt.toString().slice(0,10)}
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

export default Redeemed;
