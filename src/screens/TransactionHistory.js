import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import moment from "moment/moment";

const screenWidth = Dimensions.get("window").width;
const TransactionHistory = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // async function retrieveUserToken() {
  //   try {
  //     const token = await AsyncStorage.getItem('userToken');
  //     if (token !== null) {
  //       //console.log('User token retrieved successfully:', token);
  //       setUserToken(token);
  //     }
  //   } catch (error) {
  //     console.log('Error retrieving user token:', error);
  //   }
  // };
  async function retrieveUser() {
    try {
      const user = await AsyncStorage.getItem("codivasUser");
      const userToken = await AsyncStorage.getItem("userToken");
      if (user !== null && userToken !== null) {
        setUser(JSON.parse(user));
        setUserToken(userToken);
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
          let res = await fetch(
            "https://ez-rupi.onrender.com/api/beneficiary/transactions",
            requestOptions
          );
          let result = await res.json();
          
          if (result.data) {
            setData(result.data);
            console.log("Entered");
            setIsLoading(false);
          }
        }
        fetchData();
      }
    } catch (error) {
      console.log("Error retrieving user token:", error);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    retrieveUser();
  },[]);


  const renderTransactionHistory = () => {
    return (
      data &&
      data.map((transaction, index) => (
        <View style={styles.transactionContainer} key={index}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.payee}>{transaction.payee}</Text>
            <View>
              <Text style={styles.amount}>₹{transaction.amount}</Text>
            </View>
          </View>
          {/* <Text style={styles.details}>Voucher ID :{transaction.voucherUid}</Text> */}
          <Text style={styles.details}>
            {moment(transaction.datetime).format("MMM Do YYYY")} at{" "}
            {moment(transaction.datetime).format("h:mm a")}{" "}
          </Text>
        </View>
      ))
    );
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
      ) : user ? (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <TextInput style={styles.searchInput} placeholder="Search..." />
              <TouchableOpacity style={styles.profileIcon}>
                <Text style={styles.profileImage}>{user.name.charAt(0)}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Transaction History</Text>
            <View style={styles.historyContainer}>
              {renderTransactionHistory()}
            </View>
          </View>
        </ScrollView>
      ) : (
        ""
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#fff',
    justifyContent: "center",
  },
  loader: {
    justifyContent: "center",
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 0.02 * screenWidth,
    paddingHorizontal: 0.05 * screenWidth,
    marginTop: 50,
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 0.03 * screenWidth,
  },
  profileIcon: {
    marginLeft: 0.04 * screenWidth,
  },
  profileImage: {
    width: 0.13 * screenWidth,
    height: 0.13 * screenWidth,
    borderRadius: 0.04 * screenWidth,
    backgroundColor: "#0E1D61",
    borderRadius: 50,
    color: "white",
    textAlign: "center",
    fontSize: 30,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    color: "#000",
    marginLeft: 10,
  },
  historyContainer: {
    marginTop: 16,
  },
  transactionContainer: {
    backgroundColor: "white",
    margin: 10,
    width: 350,
    height: 79,
    borderRadius: 5,
    padding: 10,
  },
  payee: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#000",
  },
  amount: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
  },
  details: {
    fontSize: 13,
    color: "#000",
    marginTop: 4,
  },
});

export default TransactionHistory;
