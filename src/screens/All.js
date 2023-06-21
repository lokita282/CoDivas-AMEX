import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import moment from 'moment/moment';
import { useNavigation } from '@react-navigation/native';
import httpcommon from '../../httpcommon';
import { decryptData } from '../encryptdecrypt';

const Card = ({ image, title, receivedDate, expiringDate, amount }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.cardText}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.info, styles.dateText]}>
          {`Valid from - `}
          <Text style={styles.normalText}>{moment(receivedDate).format('MMM Do, YYYY')}</Text>
        </Text>
        <Text style={[styles.info, styles.dateText]}>
          {`Valid till - `}
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

const All = ({ title }) => {
  const navigation = useNavigation();
  //const title=route.params.title;
  const lowercaseTitle = title.charAt(0).toLowerCase() + title.slice(1);
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function retrieveUserToken() {
    setIsLoading(true)
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        setUserToken(token);


        async function fetchData() {
          try {
            const response = await httpcommon(`https://ez-rupi-secure.onrender.com/api/beneficiary/multiple/${lowercaseTitle}/upcoming`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            const result = JSON.parse(JSON.parse(decryptData(response.data)))
            setData(result.data);
            setIsLoading(false)
          } catch (error) {
            console.log('Error fetching data:', error);
          }
        }

        fetchData();

      }
    } catch (error) {
      console.log('Error retrieving user token:', error);
    }
  }

  useEffect(() => {
    retrieveUserToken();
  }, []);


  return (
    <>
      {isLoading ? <View style={styles.loader}>
        {/* <Text>Loading</Text> */}
        <LottieView source={require('../assets/loader.json')} autoPlay loop />
      </View> : !data.length ? <View style={styles.noDataContainer}>
        <Image source={require('../assets/notfound.png')} style={styles.notfound} />
        {/* <LottieView source={require('../assets/not.json')} autoPlay loop /> */}
      </View> : <ScrollView>
        <View style={styles.container}>
          {data.map((item, index) => (
            <Card
              key={item._id}
              image={item.issuedByLogo}
              title={item.title}
              receivedDate={item.startsAt.toString().slice(0, 10)}
              expiringDate={item.endsAt.toString().slice(0, 10)}
              amount={item.useType === "single" ? item.amount : item.balanceAmount}
            />
          ))}
        </View>
      </ScrollView>
      }
    </>
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
    width: screenWidth * 0.95,
    height: 100,
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
  notfound: {
    resizeMode: 'contain',
    height: 200,
    width: 300,
  }
});

export default All;
