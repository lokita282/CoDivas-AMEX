import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import All from './src/screens/All'
import Register from './src/screens/Register';
import Category from './src/screens/Category';
import BottomTab from './src/screens/BottomTab';
import Coupons from './src/screens/Coupons';
import Expired from './src/screens/Expired';
import NotRedeemed from './src/screens/NotRedeemed';
import Redeem from './src/screens/Redeem';
import Redeemed from './src/screens/Redeemed';
import TopTab from './src/screens/TopTab';
import TransactionHistory from './src/screens/TransactionHistory';
import GovernmentScheme from './src/screens/GovernementScheme';
import Otp from './src/screens/Otp';
import Verified from './src/screens/Verified';
import Login from './src/screens/Login';
import Splash from './src/screens/Splash';
import IntroScreen from './src/screens/IntroScreen';
import Details from './src/screens/Details';
import Dashboard from './src/screens/Dashboard'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown:false}}
        />
      <Stack.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{headerShown:false}}
        />
      <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="Category"
          component={Category}
          options={{headerShown:false}}/>
          <Stack.Screen 
          name="Coupons"
          component={Coupons}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="TopTab"
          component={TopTab}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="All"
          component={All}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="Redeemed"
          component={Redeemed}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="Not Redeemed"
          component={NotRedeemed}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="Expired"
          component={Expired}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="Redeem"
          component={Redeem}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="TransactionHistory"
          component={TransactionHistory}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="GovernmentScheme"
          component={GovernmentScheme}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="BottomTab"
          component={BottomTab}
          options={{headerShown:false}}/>
        <Stack.Screen 
          name="Otp"
          component={Otp}
          options={{headerShown:false}}/>
         <Stack.Screen 
          name="Verified"
          component={Verified}
          options={{headerShown:false}}/>
         <Stack.Screen 
          name="Details"
          component={Details}
          options={{headerShown:false}}/>
          <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;