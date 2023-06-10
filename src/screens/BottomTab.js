import React from 'react';
import {
    View,
    StyleSheet,
    Image,
  } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Category from './Category';
import GovernmentScheme from './GovernementScheme';
import TransactionHistory from './TransactionHistory';

const Tab=createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const BottomTab=()=>{
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
             
            <Tab.Screen  name="Category" component={Category} 
                options={{
                    headerShown: false,
                    tabBarIcon:({focused})=>(
                        <View>
                            <Image
                            source={require('../assets/bank.png')}
                            resizeMode='contain'
                            style={{
                                width:25,
                                height:25,
                                //tintColor:focused?'#e32f45':'#748c94'

                            }}/>
                        </View>
                    )
                 }}/>
            <Tab.Screen  name="Government Schemes" component={GovernmentScheme} 
            options={{
                headerShown: false,
                tabBarIcon:({focused})=>(
                    <View>
                        <Image
                        source={require('../assets/bank.png')}
                        resizeMode='contain'
                        style={{
                            width:25,
                            height:25,
                            //tintColor:focused?'#e32f45':'#748c94'

                        }}/>
                    </View>
                )
             }}/>
            <Tab.Screen  name="Transaction History" component={TransactionHistory}
            options={{
                headerShown: false,
                tabBarIcon:({focused})=>(
                    <View>
                        <Image
                        source={require('../assets/bank.png')}
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
export default BottomTab;
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