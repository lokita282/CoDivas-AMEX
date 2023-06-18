
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LottieView from 'lottie-react-native';
// import moment from 'moment/moment';
// import { useNavigation } from '@react-navigation/native';

// const Card = ({ image, title, receivedDate, expiringDate }) => {
//   return (
//     <View style={styles.cardContainer}>
//       <Image source={{ uri: image }} style={styles.image} />
//       <View style={styles.cardText}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={[styles.info, styles.dateText]}>
//           {`Starts At - `}
//           <Text style={styles.normalText}>{moment(receivedDate).format("MMM Do, YYYY")}</Text>
//         </Text>
//         <Text style={[styles.info, styles.dateText]}>
//           {`Ends At - `}
//           <Text style={styles.normalText}>{moment(expiringDate).format("MMM Do, YYYY")}</Text>
//         </Text>
//       </View>
//     </View>
//   );
// };

// const All = ({ title }) => {
//   const navigation = useNavigation();
//   const lowercaseTitle = title.charAt(0).toLowerCase() + title.slice(1);
//   const [data, setData] = useState([]);
//   const [userToken, setUserToken] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   async function retrieveUserToken() {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (token !== null) {
//         setUserToken(token);
//       }
//     } catch (error) {
//       console.log('Error retrieving user token:', error);
//     }
//   }

//   useEffect(() => {
//     retrieveUserToken();
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 8000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       var myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${userToken}`);

//       var raw = "";

//       var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//       };

//       async function fetchData() {
//         try {
//           const response = await fetch(`https://ez-rupi.onrender.com/api/beneficiary/multiple/${lowercaseTitle}`, requestOptions);
//           const result = await response.json();
//           setData(result.data);
//         } catch (error) {
//           console.log('Error fetching data:', error);
//         }
//       }

//       fetchData();
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [userToken, lowercaseTitle]);

//   if (isLoading) {
//     return (
//       <View style={styles.loader}>
//         <LottieView
//           source={require('../assets/loader.json')}
//           autoPlay
//           loop
//         />
//       </View>
//     );
//   }

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         {data.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => navigation.navigate('Redeem', { paramKey: item._id })}
//             style={styles.card}
//           >
//             <Card
//               key={item._id}
//               image={item.issuedByLogo}
//               title={item.title}
//               receivedDate={item.startsAt.toString().slice(0, 10)}
//               expiringDate={item.endsAt.toString().slice(0, 10)}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   cardContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     margin: 10,
//     width: 370,
//     height: 79,
//     borderRadius: 5,
//   },
//   image: {
//     width: 30,
//     height: 30,
//     marginLeft: 20,
//     marginRight: 30,
//     borderRadius: 4,
//   },
//   loader: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     flex: 1,
//     padding: 20,
//   },
//   cardText: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginBottom: 4,
//     color: 'black',
//   },
//   info: {
//     fontSize: 12,
//     margin: 3,
//   },
//   dateText: {
//     color: '#333333',
//     fontWeight: 'bold',
//   },
//   normalText: {
//     fontWeight: 'normal',
//     color: 'black',
//   },
// });

// export default All;
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import moment from 'moment/moment';
import { useNavigation } from '@react-navigation/native';

const Card = ({ image, title, receivedDate, expiringDate }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.cardText}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.info, styles.dateText]}>
          {`Starts At - `}
          <Text style={styles.normalText}>{moment(receivedDate).format('MMM Do, YYYY')}</Text>
        </Text>
        <Text style={[styles.info, styles.dateText]}>
          {`Ends At - `}
          <Text style={styles.normalText}>{moment(expiringDate).format('MMM Do, YYYY')}</Text>
        </Text>
      </View>
    </View>
  );
};

const All = ({ title }) => {
  const navigation = useNavigation();
  const lowercaseTitle = title.charAt(0).toLowerCase() + title.slice(1);
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function retrieveUserToken() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        setUserToken(token);
      }
    } catch (error) {
      console.log('Error retrieving user token:', error);
    }
  }

  useEffect(() => {
    retrieveUserToken();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

   useEffect(() => {
    const timer = setTimeout(() => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${userToken}`);

      var raw = "";

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      async function fetchData() {
        try {
          const response = await fetch(`https://ez-rupi.onrender.com/api/beneficiary/multiple/${lowercaseTitle}`, requestOptions);
          const result = await response.json();
          setData(result.data);
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      }

      fetchData();
    }, 5000);

    return () => clearTimeout(timer);
  }, [userToken, lowercaseTitle]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <LottieView source={require('../assets/loader.json')} autoPlay loop />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <LottieView source={require('../assets/notfound.json')} autoPlay loop />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {data.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('Redeem', { paramKey: item._id })} style={styles.card}>
            <Card
              key={item._id}
              image={item.issuedByLogo}
              title={item.title}
              receivedDate={item.startsAt.toString().slice(0, 10)}
              expiringDate={item.endsAt.toString().slice(0, 10)}
            />
          </TouchableOpacity>
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
    backgroundColor: 'white',
    margin: 10,
    width: 370,
    height: 79,
    borderRadius: 5,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 30,
    borderRadius: 4,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333333',
  },
  cardText: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
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
    color: 'black',
  },
});

export default All;
