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
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
