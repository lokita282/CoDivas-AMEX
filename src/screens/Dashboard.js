import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView,Dimensions,TouchableOpacity } from "react-native";
const screenWidth = Dimensions.get("window").width;
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [userData,setuserData]=useState(null);
  const [userToken, setUserToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
          .then(()=>setIsLoading(false))
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
          <Text style={styles.welcomeText}>Welcome, {userData.name} !</Text>
          <View style={styles.profileIconContainer}>
              <TouchableOpacity style={styles.profileIcon}>
                <Text style={styles.profileImage}>{userData.name.charAt(0)}</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.cardContainer}>
          <Image
            source={require("../assets/education.png")}
            style={styles.cardImage}
          />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <Text style={styles.cardText}>Vouchers Worth</Text>
            <Text style={styles.cardAmount}>₹ {formatAmount(data.totalAmount)}</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <Text style={styles.cardText}>Total Vouchers</Text>
            <Text style={styles.cardAmount}>{data.totalVouchers}</Text>
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.sectionHeader}>Vouchers</Text>
        </View>
        <View style={styles.cardContainer1}>
          <View style={styles.rowContainer}>
            <View style={styles.card1}>
              <Image
                source={require("../assets/education.png")}
                style={styles.cardImage1}
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>Valid Vouchers</Text>
                <Text style={styles.cardCount}>Count: {data.totalValidVouchers}</Text>
              </View>
            </View>
            <View style={styles.card1}>
              <Image
                source={require("../assets/education.png")}
                style={styles.cardImage1}
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>Upcoming Vouchers</Text>
                <Text style={styles.cardCount}>Count: {data.totalUpcomingVouchers}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.card2}>
              <Image
                source={require("../assets/education.png")}
                style={styles.cardImage1}
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>Redeemed Vouchers</Text>
                <Text style={styles.cardCount}>Count: {data.totalRedeemedVouchers}</Text>
              </View>
            </View>
            <View style={styles.card2}>
              <Image
                source={require("../assets/education.png")}
                style={styles.cardImage1}
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>Expired Vouchers</Text>
                <Text style={styles.cardCount}>Count: {data.totalExpiredVouchers}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>:""}
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
    overflow:"hidden",
  },
  profileImage: {
    width: 0.13 * screenWidth,
    height: 0.13 * screenWidth,
    backgroundColor: "#0E1D61",
    color: "white",
    fontSize: 30,
    padding: 5,
    marginLeft:Platform.OS === "android" ? 0.015 * screenWidth : 0.017 * screenWidth,
    marginTop:Platform.OS === "android" ? -5: -2,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
  },
  cardContainer1: {
    //backgroundColor: '#fff',
    borderRadius: 8,
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  cardText: {
    fontSize: 16,
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
    fontSize: 16,
    fontWeight:'bold',
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
  },
  card2: {
    flex: 0.5,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    height: 150,
    marginBottom:100,
  },
  cardDetails: {
    paddingTop: -100,
    padding: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardCount: {
    fontSize: 14,
    color: "#888",
  },
});

export default Dashboard;
