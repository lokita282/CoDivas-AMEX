import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal } from "react-native";
const screenWidth = Dimensions.get("window").width;
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { Ionicons } from '@expo/vector-icons';

const Dashboard = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [userData, setuserData] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Login")
    setIsPopoverVisible(false);
  };

  async function retrieveUserToken() {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const name = await AsyncStorage.getItem("codivasUser")
      if (token !== null) {
        //console.log('User token retrieved successfully:', token);
        setUserToken(token);
        setuserData(JSON.parse(name));
      }
    } catch (error) {
      console.log("Error retrieving user token:", error);
    }
  }

  useEffect(() => {
    retrieveUserToken();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${userToken}`);

      var raw = "";

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      async function fetchData() {
        await fetch(
          "https://ez-rupi.onrender.com/api/beneficiary/account-summary",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setData(result.data))
          .then(() => setIsLoading(false))
          .catch((error) => console.log("error", error));
      }
      fetchData();
    }, 5000);
    return () => clearTimeout(timer);
  });

  const formatAmount = (amount) => {
    return amount.toLocaleString("en-IN");
  };
  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <LottieView
            source={require("../assets/loader.json")} // Replace with the path to your Lottie animation file
            autoPlay
            loop
          />
        </View>
      ) : data ? <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome, {userData.name.split(" ")[0]} !</Text>
              

              <View style={styles.profileIconContainer}>
      <TouchableOpacity style={styles.profileIcon} onPress={() => setPopoverVisible(true)}>
        <Text style={styles.profileImage}>{userData.name.charAt(0)}</Text>
      </TouchableOpacity>

      <Modal
        visible={isPopoverVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setPopoverVisible(false)}
      >
        <TouchableOpacity
          style={styles.popoverContainer}
          onPress={() => setPopoverVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.popover}>
            <TouchableOpacity style={styles.popoverItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#333" />
              <Text style={styles.popoverItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
            </View>
          <TouchableOpacity onPress={() => { navigation.navigate('Category') }}>
            <View style={styles.cardContainer}>
              <Image
                source={require("../assets/db.png")}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.cardContainer}>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>Vouchers Worth</Text>
              <Text style={styles.cardAmount}>₹ {formatAmount(data.totalAmount)}</Text>
            </View>
          </View>

          <View style={styles.cardContainer}>

            <View style={styles.cardRow}>
              <Text style={styles.cardText}>Vouchers Received</Text>
              <Text style={styles.cardAmount}>{data.totalVouchers}</Text>
            </View>
          </View>
          <View style={styles.header}>
            <Text style={styles.sectionHeader}>Your Vouchers</Text>
          </View>
          <View style={styles.cardContainer1}>
            <View style={styles.rowContainer}>
              <View style={styles.card1}>
                <Image
                  source={require("../assets/val.jpg")}
                  style={styles.cardImage1}
                />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardCount}><Text style={{fontWeight:'bold',color:'black',fontSize:17}}>{data.totalValidVouchers} </Text></Text>
                  <Text style={styles.cardTitle}>Valid Vouchers</Text>
                </View>
              </View>
              <View style={styles.card1}>
                <Image
                  source={require("../assets/up.png")}
                  style={styles.cardImage1}
                />
                <View style={styles.cardDetails}>
                <Text style={styles.cardCount}><Text style={{fontWeight:'bold',color:'black',fontSize:17}}>{data.totalUpcomingVouchers} </Text></Text>
                  <Text style={styles.cardTitle}>Upcoming Vouchers</Text>
                </View>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.card2}>
                <Image
                  source={require("../assets/red.jpg")}
                  style={styles.cardImage1}
                />
                <View style={styles.cardDetails}>
                <Text style={styles.cardCount}><Text style={{fontWeight:'bold',color:'black',fontSize:17}}>{data.totalRedeemedVouchers} </Text></Text>
                  <Text style={styles.cardTitle}>Redeemed Vouchers</Text>
                </View>
              </View>
              <View style={styles.card2}>
                <Image
                  source={require("../assets/exp.png")}
                  style={styles.cardImage1}
                />
                <View style={styles.cardDetails}>
                <Text style={styles.cardCount}><Text style={{fontWeight:'bold',color:'black',fontSize:17}}>{data.totalExpiredVouchers} </Text></Text>
                  <Text style={styles.cardTitle}>Expired Vouchers</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView> : ""}
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  loader: {
    justifyContent: "center",
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileIconContainer: {
    marginLeft: 0.04 * screenWidth,
    overflow: "hidden",
  },
  profileIcon: {
    width: 0.13 * screenWidth,
    height: 0.13 * screenWidth,
    borderRadius: 0.065 * screenWidth,
    backgroundColor: "#0E1D61",
    color: "white",
    //textAlign: "center",
    fontSize: 30,
    padding: 5,
    overflow: "hidden",
  },
  profileImage: {
    width: 0.13 * screenWidth,
    height: 0.13 * screenWidth,
    backgroundColor: "#0E1D61",
    color: "white",
    fontSize: 30,
    padding: 5,
    marginLeft: Platform.OS === "android" ? 0.015 * screenWidth : 0.017 * screenWidth,
    marginTop: Platform.OS === "android" ? -5 : -2,
  },
  cardContainer: {
    borderRadius: 8,
    marginBottom: 16,
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // shadowOffset: {width: -2, height: 4},  
    // shadowColor: 'rgba(94,99,116,0.21)',  
    // shadowOpacity: 0.5,  
    // shadowRadius: 3, 
  },
  cardContainer1: {
    //backgroundColor: '#fff',
    borderRadius: 8,
  },
  cardImage: {
    width: "92%",
    height: 190,
    resizeMode: "cover",
    borderRadius: 8,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '92%'
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardImage1: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3056BD'
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 0.5,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    
  },
  card1: {
    flex: 0.5,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    height: 150,
    shadowOffset: {width: -2, height: 4},  
    shadowColor: 'rgba(94,99,116,0.21)',  
    shadowOpacity: 0.5,  
    shadowRadius: 3,  
  },
  card2: {
    flex: 0.5,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    height: 150,
    marginBottom: 100,
    shadowOffset: {width: -2, height: 4},  
    shadowColor: 'rgba(94,99,116,0.21)',  
    shadowOpacity: 0.5,  
    shadowRadius: 3, 
  },
  cardDetails: {
    paddingTop: -100,
    padding: 10,
    alignItems:'center',
    
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "normal",
  },
  cardCount: {
    fontSize: 14,
    color: "#888",
  },
  popoverContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popover: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 120,
    position: 'absolute',
    top: 60, 
    right: 10, 
    elevation: 4,
  },
  popoverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  popoverItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default Dashboard;
