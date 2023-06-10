/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Redeem from './src/screens/Redeem';
import Register from './src/screens/Register';
import Category from './src/screens/Category';
import Coupons from './src/screens/Coupons';
import All from './src/screens/All';
import TopTab from './src/screens/TopTab';
import GovernmentScheme from './src/screens/GovernementScheme';
import TransactionHistory from './src/screens/TransactionHistory';
import BottomTab from './src/screens/BottomTab';
import Otp from './src/screens/Otp';
import Verified from './src/screens/Verified';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
