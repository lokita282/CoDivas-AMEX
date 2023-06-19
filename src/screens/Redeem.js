import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment/moment";
import LottieView from "lottie-react-native";

const ProfileIcon = () => {
  return (
    <Image
      source={require("../assets/profile.png")}
      style={styles.profileIcon}
    />
  );
};

const Redeem = ({ navigation, route }) => {
  const [status,setStatus]=useState(false);
  const eRupi = require("../assets/erupi.png");
  const id = route.params.paramKey;
  const data =route.params.paramKey1;
  const userToken=route.params.paramKey2;



  useEffect(() => {
    console.log(userToken);
    const fetchData = async () => {
      var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userToken}`);
  
        var raw = "";
  
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
      try {
        const response = await fetch(
          `https://ez-rupi.onrender.com/api/beneficiary/verification-code/${id}`,
          requestOptions
        );
        const result = await response.json();
        console.log(result);
        if (result.verificationCode) {
          setStatus(result.scanned);
          console.log(result.scanned);
          if (result.scanned) {
            navigation.navigate("Otp", { paramKey: id, code: result.verificationCode, token:userToken ,bankLogo:data.issuedByLogo, orgLogo:data.orgLogo});
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    // Fetch data manually once before starting the interval
    fetchData();

    const startFetchingData = async () => {
      // Fetch data manually once before starting the interval
      await fetchData();
  
      // Start the interval
      interval = setInterval(async () => {
        await fetchData();
      }, 2000);
    };
  
    startFetchingData();

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {!status ? (
        <View style={styles.container}>
          <View>
            <ProfileIcon />
          </View>
          <View style={styles.logoContainer}>
            <Image source={{ uri: data.orgLogo }} style={styles.logo} />
            <Image source={{ uri: data.issuedByLogo }} style={styles.logo} />
          </View>
          <View style={styles.schemeDetails}>
            <Text style={styles.maintitle}>{data.title}</Text>
            <Text style={styles.details}>
              {data.useType.charAt(0).toUpperCase() + data.useType.slice(1)}| ₹{" "}
              {data.amount}
            </Text>
          </View>
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={data.qrString}
              logo={eRupi}
              logoSize={50}
              size={250}
            />
          </View>
          <Text style={styles.validity}>
            Valid till : {moment(data.validity).format("MMM Do, YYYY")}
          </Text>
          <Text style={styles.info}>
            Ask Merchant to scan the QR code to redeem the coupon.
          </Text>
          <View style={styles.cardContainer}>
            <Image source={eRupi} style={styles.image} />
            <View style={styles.cardText}>
              <Text style={styles.title}>To know more about e-RUPI</Text>
              <Text style={styles.title1}>Click Here</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <LottieView source={require("../assets/loader.json")} autoPlay loop />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  profileIcon: {
    width: 50,
    height: 50,
    marginLeft: 330,
    marginTop: 50,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 16,
    marginTop: 13,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  schemeDetails: {
    marginBottom: 16,
    alignItems: "center",
  },
  maintitle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
    color: "#375EC0",
  },
  details: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  qrCodeContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  validity: {
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
    color: "black",
  },
  info: {
    fontSize: 14,
    marginTop: 10,
    marginRight: 50,
    marginLeft: 50,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  cardContainer: {
    flexDirection: "row",
    width: 400,
    alignItems: "center",
    marginTop: 60,
    padding: 10,
    marginLeft: 0,
    backgroundColor: "#375EC0",
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 4,
  },
  cardText: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  title1: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    textDecorationLine: "underline",
  },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
  },
});

export default Redeem;
