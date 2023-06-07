// // import React from 'react';
// // import { Text, View } from 'react-native';

// // const All = () => {
// //   return (
// //     <View
// //       style={{
// //         flex: 1,
// //         justifyContent: "center",
// //         alignItems: "center"
// //       }}>
// //       <Text>All Page</Text>
// //     </View>
// //   )
// // }
// // export default All;

// import React from 'react';
// import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

// const Card = ({ image, title, receivedDate, expiringDate }) => {
//   return (
//     <View style={styles.cardContainer}>
//       <Image source={image} style={styles.image} />
//       <View style={styles.cardText}>
//         <Text style={styles.title}>{title}</Text>
//         <Text>{`Received: ${receivedDate}`}</Text>
//         <Text>{`Expiring Soon: ${expiringDate}`}</Text>
//       </View>
//     </View>
//   );
// };

// const All = ({ data }) => {
//   return (
//     <FlatList
//       data={data}
//       renderItem={({ item }) => (
//         <Card
//           image={item.image}
//           title={item.title}
//           receivedDate={item.receivedDate}
//           expiringDate={item.expiringDate}
//         />
//       )}
//       keyExtractor={(item) => item.id.toString()}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginRight: 10,
//   },
//   cardText: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
// });

// export default All;
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ image, title, receivedDate, expiringDate }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.image} />
      <View style={styles.cardText}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>{`Received: ${receivedDate}`}</Text>
        <Text style={styles.info}>{`Expiring: ${expiringDate}`}</Text>
      </View>
    </View>
  );
};

const All = () => {
  const data = [
    {
      id: 1,
      image: require('../assets/one.png'),
      title: 'Prescription Medication',
      receivedDate: '01/04/2023',
      expiringDate: '01/04/2023',
    },
    {
      id: 2,
      image: require('../assets/two.png'),
      title: 'Doctor Visit',
      receivedDate: '01/04/2023',
      expiringDate: '01/04/2023',
    },
    {
      id: 3,
      image: require('../assets/one.png'),
      title: 'Dental Care',
      receivedDate: '01/04/2023',
      expiringDate: '01/04/2023',
    },
    {
      id: 4,
      image: require('../assets/three.png'),
      title: 'Mental Health',
      receivedDate: '01/04/2023',
      expiringDate: '01/04/2023',
    },
    // Add more data objects for additional cards
  ];

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <Card
          key={item.id}
          image={item.image}
          title={item.title}
          receivedDate={item.receivedDate}
          expiringDate={item.expiringDate}
        />
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

export default All;
