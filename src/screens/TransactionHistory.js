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
import FuzzySearch from "fuzzy-search";

const screenWidth = Dimensions.get("window").width;
const TransactionHistory = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tranc, setShowTranc] = useState(data)

  const searcher = new FuzzySearch(data, ['payee', 'amount'], {
    caseSensitive: false,
});

useEffect(() => {
    const res = searcher.search(search)
    setShowTranc(res)
}, [search])

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
            setShowTranc(result.data)
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
  }, []);

  const renderTransactionHistory = () => {
    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = [
        "#FFA500",
        "#FF69B4",
        "#FF4500",
        "#FF00FF",
        "#FF0000",
        "#00FF7F",
        "#FF1493",
        "#00CED1",
        "#FF8C00",
        "#9932CC",
        "#FFD700",
        "#48D1CC",
        "#FF69B4",
        "#32CD32",
        "#8A2BE2",
        "#FF6347",
        "#87CEFA",
        "#FF00FF",
        "#90EE90",
        "#9370DB",
        "#FF4500",
        "#1E90FF",
        "#FFA07A",
        "#6A5ACD",
        "#FF1493",
        "#0B5563", "#0A014F", "#C5283D", " #AA8781 ", "#FB3A96", "#6E103B", "#A336C7", "#113673", "#4F852A"
      ];
      let num = Math.floor(Math.random() * (30 - 0 + 1) + 0)
      return color[num];
    };
    return (
      data &&
      tranc.reverse().map((transaction, index) => (
        <View style={styles.transactionContainer} key={index}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* <Image
              source={require('../assets/logo.png')} // Replace with the image source path
              style={styles.image}
            /> */}
            <View style={styles.payeeIconContainer}>
              <TouchableOpacity
                style={[
                  styles.payeeIcon,
                  { backgroundColor: getRandomColor() },
                ]}
              >
                <Text
                  style={[styles.payeeImage, { backgroundColor: "#00000000" }]}
                >
                  {transaction.payee.charAt(0)}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: -30 }}>
              <View style={{ flexDirection: "row" }}>

                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.payee}
                  overflow="scroll"
                >
                  {transaction.payee}
                </Text>

              </View>
              <Text style={styles.details}>
                {moment(transaction.datetime).format("MMM Do YYYY")} at{" "}
                {moment(transaction.datetime).format("h:mm a")}
              </Text>
            </View>
            <View>
              <Text style={styles.amount}>₹{transaction.amount}</Text>
            </View>
          </View>
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
              <TextInput style={styles.searchInput} placeholder="Search" value={search}
              onChangeText={(text) => setSearch(text)} />
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
  profileIconContainer: {
    marginLeft: 0.02 * screenWidth,
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
    marginLeft: 0.03 * screenWidth,
  },
  profileImage: {
    width: 0.13 * screenWidth,
    height: 0.13 * screenWidth,
    backgroundColor: "#0E1D61",
    color: "white",
    fontSize: 30,
    padding: 5,
    marginLeft:
      Platform.OS === "android" ? 0.015 * screenWidth : 0.017 * screenWidth,
    marginTop: Platform.OS === "android" ? -5 : -2,
  },
  payeeIconContainer: {
    marginLeft: 0.04 * screenWidth,
    overflow: "hidden",
  },
  payeeIcon: {
    width: 0.13 * screenWidth,
    height: 0.13 * screenWidth,
    borderRadius: 0.065 * screenWidth,
    //backgroundColor: "#0E1D61",
    color: "white",
    //textAlign: "center",
    fontSize: 30,
    padding: 5,
    overflow: "hidden",
    marginLeft: 0,
    //marginTop:5,
  },
  payeeImage: {
    width: 0.13 * screenWidth,
    height: 0.13 * screenWidth,
    //backgroundColor: "#0E1D61",
    color: "white",
    fontSize: 30,
    padding: 0.02 * screenWidth,
    marginLeft: Platform.OS === "android" ? 0.012 * screenWidth : 0.013 * screenWidth,
    marginTop: Platform.OS === "android" ? -5 : -6,
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
    width: 0.91 * screenWidth,
    height: 79,
    borderRadius: 5,
    padding: 10,
    paddingTop: 0.03 * screenWidth,
  },
  payee: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#000",
    flex: 1,
  },
  amount: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
    paddingRight: 10,
  },
  details: {
    fontSize: 13,
    color: "#000",
    marginTop: 4,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 4,
    marginTop: 10,
  },
});

export default TransactionHistory;
