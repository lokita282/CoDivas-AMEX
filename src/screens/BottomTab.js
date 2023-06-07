import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
    Text,
  } from 'react-native';
import {
     createBottomTabNavigator
     } from '@react-navigation/bottom-tabs';
import Upcoming from '../screens/Upcoming';
import Search from '../screens/Search';
import Favourite from '../screens/Favourite';
import Profile from '../screens/Profile';
import Splash from '../screens/Splash';
import Login from '../screens/Splash';
import Signup from '../screens/Signup';
import UploadImage from '../screens/UploadImage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStackNavigator from './StackNavigator';
import Top from './TopNavigator';
const Tab=createBottomTabNavigator();
const Stack = createStackNavigator();
// function UpcomingStack(){
//     return(
//         <NavigationContainer>
//         <Stack.Navigator initialRouteName="Splash">
//           <Stack.Screen
//             name="Splash"
//             component={Splash}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="Login"
//             component={Login}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="Signup"
//             component={Signup}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="Profile"
//             component={Profile}
//             options={{headerShown: false}}
//           />
          
//           <Stack.Screen
//             name="UploadImage"
//             component={UploadImage}
//             options={{headerShown: false}}
//           />
         
//         </Stack.Navigator>
//       </NavigationContainer>
//     )
// }
const Tabs=()=>{
    return(
        <Tab.Navigator  screenOptions={{
                tabBarShowLabel:false,
                tabBarStyle:{
                position:'absolute',
                //bottom:25,
                //left:20,
                //right:20,
                elevation:0,
                backgroundColor:'#dff9fb',
                //borderRadius:15,
                height:70,
                ...styles.shadow

                
            }
        }}>
             
            <Tab.Screen  name="Upcoming" component={Top} 
                options={{
                    headerShown: false,
                    tabBarIcon:({focused})=>(
                        <View>
                            <Image
                            source={require('../assets/up.png')}
                            resizeMode='contain'
                            style={{
                                width:25,
                                height:25,
                                //tintColor:focused?'#e32f45':'#748c94'

                            }}/>
                        </View>
                    )
                 }}/>
            <Tab.Screen  name="Search" component={Search} 
            options={{
                headerShown: false,
                tabBarIcon:({focused})=>(
                    <View>
                        <Image
                        source={require('../assets/search.png')}
                        resizeMode='contain'
                        style={{
                            width:25,
                            height:25,
                            //tintColor:focused?'#e32f45':'#748c94'

                        }}/>
                    </View>
                )
             }}/>
            <Tab.Screen  name="Favourite" component={Favourite}
            options={{
                headerShown: false,
                tabBarIcon:({focused})=>(
                    <View>
                        <Image
                        source={require('../assets/fav.png')}
                        resizeMode='contain'
                        style={{
                            width:25,
                            height:25,
                            //tintColor:focused?'#e32f45':'#748c94'

                        }}/>
                    </View>
                )
             }}/>
            <Tab.Screen  name="Profile" component={Profile}
            options={{
                headerShown: false,
                tabBarIcon:({focused})=>(
                    <View>
                        <Image
                        source={require('../assets/prof.png')}
                        resizeMode='contain'
                        style={{
                            width:25,
                            height:25,
                            //tintColor:focused?'#e32f45':'#748c94'

                        }}/>
                    </View>
                )
             }}/>
        </Tab.Navigator>
    );
}
export default Tabs;
const styles=StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height:0,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5,}
})